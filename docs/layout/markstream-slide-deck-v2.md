# Markstream Slide Deck V3

## Content Contract

This version keeps the existing 21-page story and changes only the visual system.

| Page | Theme | Message |
|---|---|---|
| 01 | Notebook cover | Markstream-vue turns streaming Markdown into product infrastructure. |
| 02 | Light profile | Simon works across Vue, DX, AI UI, and streaming rendering tools. |
| 03 | Light context | Larger model context windows increase browser rendering pressure. |
| 04 | Light problem | Faster model streams move the bottleneck into parser, renderer, DOM, and interaction. |
| 05 | Light baseline | Traditional Markdown rendering replaces the full document. |
| 06 | Blackboard demo | Markdown-it streaming demo shows full document work per chunk. |
| 07 | Light cost | Highlighting improves output appearance but raises update cost. |
| 08 | Blackboard demo | Code, Mermaid, and KaTeX make full-render costs visible. |
| 09 | Light model | The old parser loop repeats O(N) work for each chunk. |
| 10 | Light mechanism | Dirty-tail parsing, stable-node reuse, and scheduling are the core mechanism. |
| 11 | Blackboard demo | Markstream-vue only processes the unstable tail. |
| 12 | Light quick start | A component and two props are enough to try it. |
| 13 | Light evidence | Version 1.0.7-beta.0 timing gains come from less parse, patch, and layout drift. |
| 14 | Blackboard comparison | Side-by-side rendering makes the update model difference visible. |
| 15 | Light scheduler | Optimization should preserve main-thread budget for interaction. |
| 16 | Light protocol | AI output is becoming a UI protocol, not just text. |
| 17 | Light API | Custom components and stream controls are the advanced integration surface. |
| 18 | Light playbook | Treat streaming Markdown as infrastructure with explicit boundaries. |
| 19 | Light ecosystem | Markstream-vue fills the AI streaming layer in the Markdown ecosystem. |
| 20 | Light community | Credit core maintainers and community contributors. |
| 21 | Notebook close | Close with Q&A and project contact. |

## Design Direction

Visual read: technical keynote for frontend engineers, with a hand-drawn research notebook language and a live-rendering blackboard layer.

Design dials:

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 6`

The deck uses a warm paper base, notebook ruling, pencil-like borders, marker highlights, and slightly imperfect card edges. Demo and comparison areas use dark blackboard panels inside the same paper world, so the whole deck no longer feels like a terminal console or Swiss engineering poster.

Accent palette:

- Ink: deep graphite for text and outlines.
- Marker green: active stream, success, the `M` motif.
- Highlighter yellow: section chips, callouts, and emphasized cards.
- Red pencil: traditional/full-render warnings.

## Layout Rhythm

The structure remains:

```text
Cover
  Context
  Problem
  Baseline
Demo
  Cost model
  Mechanism
Demo
  Quick start
  Evidence
Comparison demo
  Scheduler
  Protocol
  API
  Playbook
  Ecosystem
  Community
Close
```

## Asset Breakdown

Code-implemented elements:

- Notebook paper background, hand-drawn M watermark, marker labels, and pencil rules.
- All cards, labels, metric blocks, pipelines, bars, demo frames, and blackboard code panels.
- Demo state changes and stream metrics remain driven by the existing Vue logic.

Existing assets reused:

- `/markstream-logo.svg` for the cover renderer core and shared M transition.
- `/simon-avatar.png` for the profile page.
- `/project-logos/*` for project and ecosystem identity.
- `/contributors/*` for the community wall.
- `/markstream-qr.png` for the closing page.
- `/streaming-performance-evidence.json` for benchmark-derived streaming timing text encoded in the slide.
- `/parser-performance-evidence.json` for the rerun markdown-it-ts one-shot parse figures.

No new bitmap assets are required for this pass. The visual upgrade is layout, color, typography, and motion treatment rather than adding decorative imagery.
