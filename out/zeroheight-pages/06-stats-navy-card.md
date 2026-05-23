# 6. Stats + navy card accent

**Template class:** `.stats-slide`
**Background:** Offwhite (#F4F3F3)
**Canvas:** 1920 × 1080

> Proof points. Three stats + the decorative navy "DIDOMI GROUP" card.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=6&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s6) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=6)

## Screenshot

![Stats + navy card accent](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-06.png)

## Usage rules

- Numbers are Electric Blue (#465CEE), Display weight 700, 84px.
- The gradient sits *behind* the navy card as graphic accent — **never inside** the card.
- Logo strip below the stats is placeholder-style — replace with real client logos at SVG/PNG.

## HTML snippet (copy-paste)

```html
<section class="bg-offwhite stats-slide" data-label="Stats + navy card">
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo.svg" alt="Didomi"/>
      <div class="div"></div>
      <div class="sec">Proof</div>
    </div>
    <div>
      <div class="nums">
        <div>
          <div class="n">99%</div>
          <div class="h">Highest performing CMP on the market with a 99% consent string validity rate</div>
        </div>
        <div>
          <div class="n">100+</div>
          <div class="h">countries where we collect consent data</div>
        </div>
        <div>
          <div class="n">2bn+</div>
          <div class="h">consent data points collected each month</div>
        </div>
      </div>
      <h4>Trusted by organizations around the world, including</h4>
      <div class="logos-row">
        <div class="logo-ph">MICHELIN</div>
        <div class="logo-ph">orange</div>
        <div class="logo-ph">DECATHLON</div>
        <div class="logo-ph">DECATHLON</div>
        <div class="logo-ph">DECATHLON</div>
        <div class="logo-ph">PIERRE V.</div>
        <div class="logo-ph">PSG</div>
        <div class="logo-ph">Rakuten</div>
        <div class="logo-ph">Rakuten</div>
        <div class="logo-ph">Rakuten</div>
      </div>
    </div>
    <!-- Gradient sits BEHIND the navy card as graphic accent, never inside it -->
    <div class="navy-card-wrap">
      <div class="grad outer"></div>
      <div class="navy-card">
        <div class="corner-tl"></div>
        <div class="corner-br"></div>
        <div class="mark">
          <div class="big">DIDOMI</div>
          <div class="small">GROUP</div>
        </div>
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
