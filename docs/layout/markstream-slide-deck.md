# Markstream Slide Deck Layout

Status: Draft

## Design Principles

This deck is a product keynote for `markstream-vue`, not a generic technical slideshow. The visual language should feel like an AI output renderer control room: clean, dense, technical, and alive.

The central design device is the `M`. It is not decoration. It is the through-line of the talk:

- On the cover, `M` is the product logo inside the renderer stage.
- On regular content pages, `M` becomes either the title lockup or a large background field.
- On the final Q&A page, `M` lands directly inside the word `Markdown`.
- During transitions, one shared flight layer owns the visible `M` so the deck avoids duplicate logos, ghosted marks, and misaligned copies.

The deck should avoid marketing-page habits: no oversized hero-only pages after the cover, no decorative card piles, no random gradients, and no standalone logo repetition. Every page should carry either argument structure, evidence, or an interactive rendering demonstration.

## Overall Structure

```text
┌────────────────────────────────────────────────────────────┐
│ Header: kicker / page number                              │
│ ────────────────────────────────────────────────────────── │
│                                                            │
│ Main slide body                                            │
│   Cover: message + logo renderer stage                     │
│   Content: title lockup + evidence / diagram / demo        │
│                                                            │
│                                                            │
│ Footer: deck/product line                                  │
└────────────────────────────────────────────────────────────┘

Persistent layers:
  - attach-grid-bg: grid, scanline texture, subtle radial light
  - attach-top-rule: thin calibration line
  - shared-logo-flight: fixed overlay that moves the M/logo between pages
```

The background is a restrained technical grid. It gives every page the same physical space without becoming a decorative wallpaper. The palette is intentionally narrow but not monotone:

| Role | Token / Color | Purpose |
|---|---|---|
| Base | deep green `#132f25` | technical stage, low glare |
| Text | warm cream `#fff4dc` | readable keynote text |
| Brand motion | cyan `#61f2cd` | active `M`, live stream, emphasis |
| Secondary signal | amber `#d58436` | calibration marks and contrast |
| Muted copy | green-gray `#b8c3a9` | metadata and supporting text |

## Page-Level Layout

### Cover

```text
┌────────────────────────────────────────────────────────────┐
│ VUE CONF · KEYNOTE                                    01   │
│                                                            │
│  MARKSTREAM-VUE             ┌───────────────────────────┐  │
│  你的 Markdown 渲染器...     │ AI OUTPUT RENDERER        │  │
│  subtitle                   │                           │  │
│                             │      axis / rings         │  │
│  ┌─────────────┐ ┌────────┐ │          logo M           │  │
│  │ challenge   │ │ solution│ │                           │  │
│  └─────────────┘ └────────┘ │ content thinking tool...  │  │
│                             └───────────────────────────┘  │
│ Simon He / Simon-He95                                      │
└────────────────────────────────────────────────────────────┘
```

The cover introduces the product as a renderer system. The logo is placed in a blueprint stage with axes, rings, nodes, and stream labels. This gives the logo a reason to be alive before it starts flying into later pages.

### Standard Content Page

```text
┌────────────────────────────────────────────────────────────┐
│ KICKER                                               02    │
│                                                            │
│ SECTION                                                    │
│ ┌───┐  Title line, usually one strong sentence             │
│ │ M │  Optional title M target                             │
│ └───┘                                                      │
│                                                            │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐            │
│ │ evidence    │ │ diagram     │ │ demo/card   │            │
│ │ region      │ │ region      │ │ region      │            │
│ └─────────────┘ └─────────────┘ └─────────────┘            │
│                                                            │
│ markstream-vue · AI Streaming Markdown Renderer for Vue    │
└────────────────────────────────────────────────────────────┘
```

Standard pages reserve the top band for section and title, then use dense but separated evidence blocks. Cards are allowed for repeated items and framed demos, but page sections themselves should stay unframed.

### Final Q&A

```text
┌────────────────────────────────────────────────────────────┐
│ Q&A                                                  18    │
│                                                            │
│ CONTACT                                                    │
│ 你的 [M]arkdown 渲染器，扛得住 AI 输出吗？                  │
│                                                            │
│       Q&A / GitHub / npm                         QR        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

The final page resolves the motif: the moving `M` becomes the first letter of `Markdown`, not a side logo.

## M / Logo Motion Contract

The shared logo motion is implemented as one fixed overlay in `global-top.vue`. Slide content only provides invisible or hidden targets via `.logo-flight-target`.

```text
Page target state machine

Cover logo
   │
   ├─ wheel-logo / wheel / flip-x
   ▼
Title M target
   │
   ├─ wheel or flip-x for mechanical movement
   ├─ bubble for split / gather movement
   ▼
Background M field
   │
   └─ bubble-word
      ▼
Inline M in "Markdown"
```

Rules:

| Rule | Reason |
|---|---|
| Only `shared-logo-flight` should be visible during motion. | Prevent duplicate M layers and misaligned copies. |
| Local target elements define geometry, not visible decoration. | The overlay can move precisely without leaving static marks behind. |
| Returning to the cover lands from a clean single `M` into the full SVG logo. | Avoid the heavy-frame overlap where the SVG logo and abstract M stack together. |
| Bubble transitions hide the full SVG logo immediately. | The split effect should read as particles of the M, not as a logo sitting under bubbles. |
| The Q&A target is the inline `M` inside `Markdown`. | The logo motif resolves into the talk title instead of repeating in the margin. |

## Region Layout

### Header / Footer

Header and footer are fixed rails:

- Header left: slide kicker.
- Header right: two-digit page number.
- Footer: product line or author line.
- Top rule: a thin calibration line, not a heavy divider.

### Title Lockup

The title region has two variants:

| Variant | Use |
|---|---|
| `attach-title-m + h1` | Pages where `M` acts as the visible title anchor. |
| `h1` only | Pages where the `M` is background or inline in `Markdown`. |

The title should stay one to two lines when possible. Long titles should be reduced before shrinking the whole system.

### Evidence Regions

Use the layout that matches the argument:

| Slide kind | Layout pattern | Intent |
|---|---|---|
| `about` | profile + project/plugin lists | Establish speaker context. |
| `why`, `problem`, `loop` | timeline/pipeline + compact cards | Explain pressure and bottleneck. |
| `old`, `highlight`, `core` | code/demo split | Let the renderer behavior be visible. |
| `parser`, `perf` | bars and metric panels | Ground claims in measurement. |
| `compare`, `scheduler`, `ecosystem` | paired cards / system map | Show tradeoffs and boundaries. |
| `thanks`, `qa` | wall / contact layout | Close without adding new technical complexity. |

## Interactions

| Input | Scope | Behavior |
|---|---|---|
| Slide navigation | Deck | Recomputes the active `.logo-flight-target` and starts the shared M transition. |
| Play button | Streaming demos | Starts incremental Markdown output. |
| Reset button | Streaming demos | Clears content and metrics. |
| Delay buttons | Streaming demos | Changes simulated chunk delay. |
| Chunk buttons | Streaming demos | Changes characters appended per tick. |
| Wheel / manual scroll | Streaming demos | Temporarily disables auto-follow so the viewer can inspect output. |

Interactive demos must stay visually framed as tools. They should not become decorative cards; their purpose is to make parser/render behavior visible.

## State Variants

| State | Visual Behavior |
|---|---|
| Ready | Demo panes are empty or at initial content; controls are visible. |
| Streaming | Source and rendered panes scroll with a cursor; metric tiles update. |
| Done | Auto-follow settles, final document remains stable. |
| Manual scroll | Auto-follow pauses until the user returns to the bottom or restarts. |
| Reduced motion | Local orbit/rise animations are disabled; layout remains intact. |

## Responsive / Size Constraints

This is a Slidev deck designed for a 16:9 stage. The layout should be verified at presentation viewport sizes rather than treated like a mobile site.

Constraints:

- Keep outer rails near `48px` and main body padding near `58px`.
- Keep the background grid stable at `72px`; it is a coordinate system for the deck.
- Cards use restrained radius around `10px`; avoid pill-heavy layouts except for small chips.
- Do not scale typography by viewport width.
- Keep title text inside its region; prefer shorter copy over aggressive font shrinking.
- Logo flight targets must have stable dimensions and no active transform when measured.

## Component Tree

```text
slides.md
└─ AttachmentSlide(:no)
   ├─ attach-grid-bg
   ├─ attach-m-field.logo-flight-target?        [background target]
   ├─ attach-top-rule
   ├─ attach-header
   ├─ attach-main
   │  ├─ cover
   │  │  ├─ attach-cover-copy
   │  │  └─ attach-logo-stage
   │  │     └─ cover-logo.logo-flight-target    [logo target]
   │  └─ content pages
   │     ├─ attach-title-row
   │     │  ├─ attach-title-m.logo-flight-target [letter target]
   │     │  └─ attach-inline-m.logo-flight-target[Markdown target]
   │     └─ page-specific evidence layout
   └─ attach-footer

global-top.vue
└─ shared-logo-flight
   ├─ shared-logo-img
   ├─ shared-logo-letter
   └─ shared-logo-bubbles
```

## Page Entry Points

| File | Responsibility |
|---|---|
| `slides.md` | Creates the 18 Slidev pages and passes page numbers into `AttachmentSlide`. |
| `components/AttachmentSlide.vue` | Owns slide content, page kind, M target placement, and streaming demo behavior. |
| `style.css` | Owns the attachment deck visual system and page-specific layout classes. |
| `global-top.vue` | Owns shared logo/M flight overlay and page transition behavior. |

## Maintenance Notes

When adding or changing a slide:

1. Pick one M role for the page: `logo`, `letter`, `background`, or `inline-letter`.
2. Add only one active `.logo-flight-target` for that page.
3. Keep the local target visually hidden when `shared-logo-ready` is active.
4. Choose the layout pattern that fits the argument before adding new CSS.
5. Verify forward and backward navigation for the neighboring pages.
