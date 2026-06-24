import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const outDir = process.env.SLIDEV_QA_OUT_DIR || "/tmp/markstream-slidev-visual-qa";
const baseUrl = process.env.SLIDEV_QA_BASE_URL || "http://localhost:3030";
const slideCount = Number(process.env.SLIDEV_QA_SLIDES || 19);
const viewport = {
  width: Number(process.env.SLIDEV_QA_WIDTH || 1280),
  height: Number(process.env.SLIDEV_QA_HEIGHT || 720),
};

class CdpPage {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 0;
    this.pending = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result || {});
      }
    };
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    await this.send("Page.enable");
    await this.send("Runtime.enable");
    await this.send("Emulation.setDeviceMetricsOverride", {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  async evaluate(expression) {
    const result = await this.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails)
      throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
    return result.result.value;
  }

  async screenshot(path) {
    const result = await this.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    await writeFile(path, Buffer.from(result.data, "base64"));
  }

  close() {
    this.ws?.close();
  }
}

function launchChrome() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const userDataDir = `/tmp/markstream-slidev-qa-chrome-${Date.now()}`;
  const proc = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], {
    stdio: ["ignore", "ignore", "pipe"],
  });

  return { proc, port };
}

async function waitForChrome(port) {
  const endpoint = `http://127.0.0.1:${port}/json/version`;
  for (let index = 0; index < 80; index++) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) return;
    }
    catch {}
    await delay(100);
  }
  throw new Error("Chrome DevTools endpoint did not become ready");
}

async function createPage(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  });
  if (!response.ok)
    throw new Error(`Unable to create Chrome target: ${response.status}`);
  const target = await response.json();
  const page = new CdpPage(target.webSocketDebuggerUrl);
  await page.connect();
  return page;
}

async function waitForSlideContent(page, timeoutMs = 6000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const ready = await page.evaluate(`(() => {
      const text = (document.body.innerText || '')
        .replace(/Enter fullscreen|Go to previous slide|Go to next slide|Show slide overview|Show drawing toolbar/g, '')
        .trim();
      const hasVisual = !!document.querySelector('h1,.deck,.slide-head,.pixel-window,.qa-terminal');
      return text.length > 8 || hasVisual;
    })()`);
    if (ready) {
      await waitForRuntime(page, `(() => {
        const images = Array.from(document.images).filter((img) => {
          const style = getComputedStyle(img);
          const rect = img.getBoundingClientRect();
          return style.display !== 'none'
            && style.visibility !== 'hidden'
            && Number(style.opacity) > 0.02
            && rect.width > 1
            && rect.height > 1;
        });
        return images.every(img => img.complete && img.naturalWidth > 0);
      })()`);
      await delay(420);
      return true;
    }
    await delay(120);
  }
  return false;
}

async function waitForRuntime(page, expression, timeoutMs = 4000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await page.evaluate(expression))
      return true;
    await delay(80);
  }
  return false;
}

async function navigateToSlide(page, slide) {
  await page.send("Page.navigate", { url: `${baseUrl}/${slide}` });
  await waitForSlideContent(page);
  const clickCount = await page.evaluate(`(() => document.querySelectorAll('.slidev-vclick-target').length)()`);
  await page.send("Page.navigate", { url: `${baseUrl}/${slide}?clicks=${clickCount}` });
  await waitForSlideContent(page);
}

const inspectionExpression = `(() => {
  const viewport = { width: innerWidth, height: innerHeight };
  const slideRect = { left: 0, top: 0, right: innerWidth, bottom: innerHeight, width: innerWidth, height: innerHeight };
  const skipSelector = [
    '.slidev-vclick-hidden',
    '.slidev-note',
    '.slidev-notes',
    '.slidev-controls',
    '.slidev-progress',
    '.shared-logo-flight'
  ].join(',');
  const targetSelector = [
    'h1', 'h2', 'h3', 'p', 'a', 'button',
    '.pixel-kicker', '.pixel-stat', '.pixel-card',
    '.pixel-window', '.pixel-alert', '.pixel-step',
    '.identity-node', '.story-frame', '.repo-card',
    '.qa-terminal', '.qa-qr-panel', '.signal-carousel',
    'pre', 'img'
  ].join(',');

  function labelFor(el) {
    const text = (el.innerText || el.alt || el.textContent || '').replace(/\\s+/g, ' ').trim();
    const cls = String(el.className || '').split(/\\s+/).filter(Boolean).slice(0, 3).join('.');
    return {
      tag: el.tagName.toLowerCase(),
      className: cls,
      text: text.slice(0, 96),
    };
  }

  function rectFor(el) {
    const rect = el.getBoundingClientRect();
    return {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
    };
  }

  function isVisible(el) {
    if (el.closest(skipSelector)) return false;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.visibility !== 'hidden'
      && style.display !== 'none'
      && Number(style.opacity) > 0.02
      && rect.width > 1
      && rect.height > 1;
  }

  const elements = Array.from(document.querySelectorAll(targetSelector)).filter(isVisible);
  const issues = [];

  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const label = labelFor(el);
    if (rect.left < slideRect.left - 3 || rect.top < slideRect.top - 3 || rect.right > slideRect.right + 3 || rect.bottom > slideRect.bottom + 3) {
      issues.push({ type: 'out-of-slide', element: label, rect: rectFor(el) });
    }
    if ((el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) && getComputedStyle(el).overflow === 'hidden') {
      issues.push({ type: 'clipped-content', element: label, rect: rectFor(el), scroll: { width: el.scrollWidth, height: el.scrollHeight, clientWidth: el.clientWidth, clientHeight: el.clientHeight } });
    }
    if (el.tagName === 'IMG' && (!el.complete || el.naturalWidth === 0)) {
      issues.push({ type: 'broken-image', element: label, rect: rectFor(el), src: el.getAttribute('src') });
    }
  }

  const textElements = Array.from(document.querySelectorAll('h1,h2,p,a,button,.pixel-kicker,.pixel-stat b,.identity-node b,.story-frame p,.repo-card b,.repo-card span')).filter(isVisible);
  for (const el of textElements) {
    const rect = el.getBoundingClientRect();
    const points = [
      [rect.left + rect.width / 2, rect.top + rect.height / 2],
      [rect.left + Math.min(8, rect.width / 2), rect.top + rect.height / 2],
      [rect.right - Math.min(8, rect.width / 2), rect.top + rect.height / 2],
    ];
    for (const [x, y] of points) {
      if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) continue;
      const top = document.elementFromPoint(x, y);
      if (!top) continue;
      if (top === el || el.contains(top) || top.contains(el)) continue;
      if (top.closest('.slidev-layout') !== el.closest('.slidev-layout')) continue;
      issues.push({
        type: 'text-occluded',
        element: labelFor(el),
        by: labelFor(top),
        rect: rectFor(el),
        point: { x: Math.round(x), y: Math.round(y) },
      });
      break;
    }
  }

  const flight = document.querySelector('.shared-logo-flight');
  const visibleAnchors = Array.from(document.querySelectorAll('.cover-logo,.slide-corner-logo')).filter((el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return style.visibility !== 'hidden' && style.display !== 'none' && Number(style.opacity) > 0.02 && rect.width > 1 && rect.height > 1;
  });

  if (!elements.length) {
    issues.push({
      type: 'empty-slide',
      element: { tag: 'body', className: '', text: (document.body.innerText || '').slice(0, 96) },
      rect: { x: 0, y: 0, width: innerWidth, height: innerHeight, right: innerWidth, bottom: innerHeight },
    });
  }

  return {
    url: location.href,
    viewport,
    title: document.title,
    slideRect: { x: 0, y: 0, width: innerWidth, height: innerHeight, right: innerWidth, bottom: innerHeight },
    issues,
    visibleElementCount: elements.length,
    logoState: {
      flightVisible: !!flight && getComputedStyle(flight).display !== 'none' && getComputedStyle(flight).visibility !== 'hidden',
      visibleAnchorCount: visibleAnchors.length,
      flightRect: flight ? rectFor(flight) : null,
    },
  };
})()`;

async function inspectLogoTransition(page) {
  await page.send("Page.navigate", { url: `${baseUrl}/1` });
  await waitForSlideContent(page);
  await waitForRuntime(page, `(() => {
    const flight = document.querySelector('.shared-logo-flight');
    if (!flight) return false;
    const style = getComputedStyle(flight);
    const rect = flight.getBoundingClientRect();
    return style.display !== 'none'
      && style.visibility !== 'hidden'
      && Number(style.opacity) > 0.02
      && rect.width > 1
      && rect.height > 1;
  })()`);
  await waitForRuntime(page, `(() => {
    const cover = document.querySelector('.cover-logo');
    return cover && getComputedStyle(cover).visibility === 'hidden';
  })()`);
  const logoSnapshotExpression = `(() => {
    const allLogos = Array.from(document.querySelectorAll('.shared-logo-flight,.cover-logo,.slide-corner-logo')).map((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const visible = style.display !== 'none'
        && style.visibility !== 'hidden'
        && Number(style.opacity) > 0.02
        && rect.width > 1
        && rect.height > 1;
      return {
        className: String(el.className || ''),
        display: getComputedStyle(el).display,
        visibility: getComputedStyle(el).visibility,
        opacity: getComputedStyle(el).opacity,
        visible,
        rect: { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) }
      };
    });
    const logos = allLogos.filter(logo => logo.visible);
    return {
      url: location.href,
      visibleLogoCount: logos.length,
      logos,
      allLogos,
    };
  })()`;
  const before = await page.evaluate(`(() => {
    const flight = document.querySelector('.shared-logo-flight');
    const cover = document.querySelector('.cover-logo');
    return {
      flight: flight ? { display: getComputedStyle(flight).display, rect: flight.getBoundingClientRect().toJSON?.() || null } : null,
      coverVisibility: cover ? getComputedStyle(cover).visibility : null,
      snapshot: ${logoSnapshotExpression},
    };
  })()`);
  await page.evaluate(`(() => {
    window.focus();
    document.body?.focus();
    return true;
  })()`);
  await page.send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
  await page.send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
  await waitForRuntime(page, `location.pathname === '/2'`, 1000);
  await delay(180);
  const during = await page.evaluate(`(() => {
    const flight = document.querySelector('.shared-logo-flight');
    const anchors = Array.from(document.querySelectorAll('.cover-logo,.slide-corner-logo')).map(el => ({
      className: el.className,
      visibility: getComputedStyle(el).visibility,
      opacity: getComputedStyle(el).opacity,
      rect: (() => { const r = el.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; })()
    }));
    return {
      flightVisible: !!flight && getComputedStyle(flight).display !== 'none',
      flightStyle: flight ? {
        width: getComputedStyle(flight).width,
        height: getComputedStyle(flight).height,
        opacity: getComputedStyle(flight).opacity,
        transition: getComputedStyle(flight).transitionDuration,
        rect: (() => { const r = flight.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; })()
      } : null,
      anchors,
      snapshot: ${logoSnapshotExpression}
    };
  })()`);
  await delay(1100);
  await waitForRuntime(page, `(() => {
    const flight = document.querySelector('.shared-logo-flight');
    if (!flight) return false;
    const style = getComputedStyle(flight);
    const rect = flight.getBoundingClientRect();
    return location.pathname === '/2'
      && style.display !== 'none'
      && style.visibility !== 'hidden'
      && Number(style.opacity) > 0.02
      && rect.width > 1
      && rect.height > 1;
  })()`);
  const after = await page.evaluate(`(() => {
    const flight = document.querySelector('.shared-logo-flight');
    const anchors = Array.from(document.querySelectorAll('.cover-logo,.slide-corner-logo')).map(el => ({
      className: el.className,
      visibility: getComputedStyle(el).visibility,
      opacity: getComputedStyle(el).opacity
    }));
    return {
      flightVisible: !!flight && getComputedStyle(flight).display !== 'none',
      flightRect: flight ? (() => { const r = flight.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; })() : null,
      anchors,
      snapshot: ${logoSnapshotExpression}
    };
  })()`);

  return { before, during, after };
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const { proc, port } = launchChrome();
  const stderr = [];
  proc.stderr.on("data", chunk => stderr.push(String(chunk)));
  try {
    await waitForChrome(port);
    const page = await createPage(port);
    const slides = [];
    for (let slide = 1; slide <= slideCount; slide++) {
      await navigateToSlide(page, slide);
      const inspection = await page.evaluate(inspectionExpression);
      const screenshot = `${outDir}/page-${String(slide).padStart(2, "0")}.png`;
      await page.screenshot(screenshot);
      slides.push({ slide, screenshot, ...inspection });
      const issueLabel = inspection.issues.length ? `${inspection.issues.length} issues` : "ok";
      console.log(`page ${slide}: ${issueLabel}`);
    }
    const logoPage = await createPage(port);
    const logoTransition = await inspectLogoTransition(logoPage);
    logoPage.close();
    const report = {
      generatedAt: new Date().toISOString(),
      baseUrl,
      slideCount,
      viewport,
      slides,
      logoTransition,
    };
    const reportPath = `${outDir}/report.json`;
    await writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`report: ${reportPath}`);
    page.close();
  }
  finally {
    proc.kill("SIGKILL");
    if (stderr.length)
      await writeFile(`${outDir}/chrome-stderr.log`, stderr.join(""));
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
