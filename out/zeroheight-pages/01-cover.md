# 1. Cover

**Template class:** `.cover`
**Background:** Navy (#04092D)
**Canvas:** 1920 × 1080

> Opens any deck. Calm, declarative — let it breathe before speaking.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=1&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s1) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=1)

## Screenshot

![Cover](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-01.png)

## Usage rules

- Title caps at `max-width: 1200px`. Longer titles must break with `<br/>`.
- Gradient sits bottom-right, partly off-canvas. Never centered.
- Logo is the white wordmark (`didomi-logo-white.svg`), top-left.

## HTML snippet (copy-paste)

```html
<section class="bg-navy cover" data-label="Cover · Navy">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo-white.svg" alt="Didomi"/>
    </div>
    <h1>Lorem ipsum dolor</h1>
    <div class="sub">Lorem ipsum dolor</div>
  </section>
```

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue #465CEE on navy, offwhite text #F4F3F3)
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: `--didomi-gradient` — see [Foundations · Brand gradient](https://bekanesp.github.io/didomi-zeroheight/previews/06-brand-gradient.html)

---

_Auto-generated from `slides/templates.html` by `tools/build-zeroheight-pages.mjs`. To refresh: edit the template, re-run the tool, repaste this page._
