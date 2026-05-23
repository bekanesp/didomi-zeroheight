# 7. Three-up · benefits

**Template class:** `.three-up`
**Background:** Offwhite (#F4F3F3)
**Canvas:** 1920 × 1080

> "Why us" / "What you get" layout. Three parallel benefits, each with its own outline numeral.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=7&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s7) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=7)

## Screenshot

![Three-up · benefits](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-07.png)

## Usage rules

- Outline numerals (1.5px stroke, transparent fill) — `.three-up` uses Electric Blue. Different from `.agenda` numerals.
- Title uses Montserrat Regular at 72px with a single Bold word for emphasis.
- Top-right gradient is half-off-canvas at 75% opacity.

## HTML snippet (copy-paste)

```html
<section class="bg-offwhite three-up" data-label="Three-up offwhite">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo.svg" alt="Didomi"/>
      <div class="div"></div>
      <div class="sec">Why Didomi</div>
    </div>
    <h2>It's time to opt for <b>better.</b><br/>And that means you can:</h2>
    <div class="cols">
      <div class="col">
        <div class="numeral">1</div>
        <h3>Defend<br/>privacy</h3>
        <p>anywhere across the globe, no matter how complex the regulations are</p>
      </div>
      <div class="col">
        <div class="numeral">2</div>
        <h3>Demand<br/>performance</h3>
        <p>with more ways to safely capture data and turn it into real results</p>
      </div>
      <div class="col">
        <div class="numeral">3</div>
        <h3>Discover more<br/>possibilities</h3>
        <p>with a responsive, consultative partner who always keeps you ahead</p>
      </div>
    </div>
  </section>
```

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue #465CEE on offwhite, navy text #04092D)
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: `--didomi-gradient` — see [Foundations · Brand gradient](https://bekanesp.github.io/didomi-zeroheight/previews/06-brand-gradient.html)

---

_Auto-generated from `slides/templates.html` by `tools/build-zeroheight-pages.mjs`. To refresh: edit the template, re-run the tool, repaste this page._
