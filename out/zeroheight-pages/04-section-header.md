# 4. Section header

**Template class:** `.section-hd`
**Background:** Navy (#04092D)
**Canvas:** 1920 × 1080

> Major-section transition. Centered, single big title + supporting line.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=4&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s4) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=4)

## Screenshot

![Section header](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-04.png)

## Usage rules

- Gradient is the *graphic* — sits centered behind the title, blurred at 90px.
- Title caps at 140px; on a 1920 canvas anything wider needs a `<br/>` break.
- Subtitle is optional. If used, keep under two lines.

## HTML snippet (copy-paste)

```html
<section class="bg-navy section-hd" data-label="Section header">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo-white.svg" alt="Didomi"/>
    </div>
    <h2>Dead-end data</h2>
    <div class="sub">All the data you can't act on because it's incomplete,<br/>inconsistent, or wasn't collected in a compliant way.</div>
  </section>
```

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue #465CEE on navy, offwhite text #F4F3F3)
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: `--didomi-gradient` — see [Foundations · Brand gradient](https://bekanesp.github.io/didomi-zeroheight/previews/06-brand-gradient.html)

---

_Auto-generated from `slides/templates.html` by `tools/build-zeroheight-pages.mjs`. To refresh: edit the template, re-run the tool, repaste this page._
