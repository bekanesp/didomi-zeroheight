# 2. Agenda · Section intro

**Template class:** `.agenda`
**Background:** Navy (#04092D)
**Canvas:** 1920 × 1080

> Section-opener. Numbered list (typically 3 items) introducing what follows.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=2&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s2) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=2)

## Screenshot

![Agenda · Section intro](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-02.png)

## Usage rules

- Display word ("Agenda") uses Montserrat Light at 170px. Don't use Bold here.
- Numerals are solid white (not outlined). The outline numeral style is for `.three-up`, not `.agenda`.
- Keep to ≤4 items — beyond that the layout cramps.

## HTML snippet (copy-paste)

```html
<section class="bg-navy agenda" data-label="Agenda">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo-white.svg" alt="Didomi"/>
    </div>
    <div class="word">Agenda</div>
    <div class="items">
      <div class="item">
        <div class="numeral">1</div>
        <div>
          <h3>Defend privacy</h3>
          <p>Compliance made effortless everywhere.</p>
        </div>
      </div>
      <div class="item">
        <div class="numeral">2</div>
        <div>
          <h3>Drive performance</h3>
          <p>Turn compliant consent into real business results.</p>
        </div>
      </div>
      <div class="item">
        <div class="numeral">3</div>
        <div>
          <h3>Deliver precision</h3>
          <p>Eliminate dead-end data with clean, accurate, activation-ready signals.</p>
        </div>
      </div>
    </div>
  </section>
```

## Foundations used

- Color tokens: see [Foundations · Color](#) (electric blue #465CEE on navy, offwhite text #F4F3F3)
- Type: Montserrat (Display weights 300, 400, 700)
- Spacing: 80px top/bottom, 100px sides (matches every slide in the system)
- Gradient: `--didomi-gradient` — see [Foundations · Brand gradient](https://bekanesp.github.io/didomi-zeroheight/previews/06-brand-gradient.html)

---

_Auto-generated from `slides/templates.html` by `tools/build-zeroheight-pages.mjs`. To refresh: edit the template, re-run the tool, repaste this page._
