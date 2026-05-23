# 8. Closing · CTA

**Template class:** `.closing`
**Background:** Offwhite (#F4F3F3)
**Canvas:** 1920 × 1080

> End-of-deck call to action. Headline + supporting line + product mockup.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=8&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s8) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=8)

## Screenshot

![Closing · CTA](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-08.png)

## Usage rules

- Mockup bleeds off-canvas — `margin-right: -100px` on the .mock element is intentional.
- Tile bars are progress indicators; the lighter the bar, the further along the user is.
- Don't introduce new colors here — must end on the same palette the deck opened with.

## HTML snippet (copy-paste)

```html
<section class="bg-offwhite closing" data-label="Closing">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo.svg" alt="Didomi"/>
    </div>
    <div>
      <h2>Opt for <b>better</b></h2>
      <div class="sub">How to get more performance out of your privacy data</div>
    </div>
    <div class="mock">
      <div class="topbar">
        <div style="width:24px;height:24px;border-radius:50%;background:#465CEE;"></div>
        Hello Julien.V
      </div>
      <div class="cards">
        <div class="pill"><span class="dot"></span>CMP · Active notices</div>
        <div class="pill y"><span class="dot"></span>DSAR · New requests</div>
        <div class="pill p"><span class="dot"></span>ACM · 2 Prep.</div>
      </div>
      <div class="tile-row">
        <div class="tile"><div class="t">Prepare &amp; Configure</div><div class="d">Define the main aspect of your privacy governance with regard to data collection.</div><div class="bar"><span style="width:32%"></span></div></div>
        <div class="tile"><div class="t">Design &amp; Publish</div><div class="d">Easily customize and deploy banners that drive higher opt-in rates.</div><div class="bar"><span style="width:80%"></span></div></div>
        <div class="tile"><div class="t">Monitor &amp; Optimize</div><div class="d">Manage key privacy metrics and resolve incidents faster.</div><div class="bar"><span style="width:56%"></span></div></div>
        <div class="tile"><div class="t">Marketplace</div><div class="d">Browse integrations with tools across your stack.</div><div class="bar"><span style="width:24%"></span></div></div>
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
