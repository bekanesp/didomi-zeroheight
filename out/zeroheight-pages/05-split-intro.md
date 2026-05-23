# 5. Split intro

**Template class:** `.split`
**Background:** Offwhite (#F4F3F3)
**Canvas:** 1920 × 1080

> First content slide after a navy section. Establishes context with a paired image.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=5&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s5) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=5)

## Screenshot

![Split intro](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-05.png)

## Usage rules

- Logo bar gets the divider + "Section title" eyebrow on offwhite slides.
- Image card is 4:5 aspect with 24px radius. Always rounded — never sharp.
- Body copy capped at `max-width: 520px`. Don't fill the column edge-to-edge.

## HTML snippet (copy-paste)

```html
<section class="bg-offwhite split" data-label="Split intro">
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo.svg" alt="Didomi"/>
      <div class="div"></div>
      <div class="sec">Section title</div>
    </div>
    <div>
      <h2>Introduction</h2>
      <div class="label">What do we do?</div>
      <p class="body">Didomi helps companies collect, respect, and activate user privacy preferences across every channel, so marketing, product, and legal teams can ship faster without trading off trust.</p>
    </div>
    <div class="img"></div>
  </section>
```

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue #465CEE on offwhite, navy text #04092D)
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: `--didomi-gradient` — see [Foundations · Brand gradient](https://bekanesp.github.io/didomi-zeroheight/previews/06-brand-gradient.html)

---

_Auto-generated from `slides/templates.html` by `tools/build-zeroheight-pages.mjs`. To refresh: edit the template, re-run the tool, repaste this page._
