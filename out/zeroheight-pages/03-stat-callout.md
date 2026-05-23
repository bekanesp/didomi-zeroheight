# 3. Stat callout

**Template class:** `.stat-slide`
**Background:** Navy (#04092D)
**Canvas:** 1920 × 1080

> Driving home a single dramatic number. Outline-icon grid visualises the proportion.

## Live preview

<iframe
  src="https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=3&embed=1"
  width="100%"
  height="540"
  frameborder="0"
  allowfullscreen
  loading="lazy"
  style="border-radius: 8px; background: #000;">
</iframe>

[Open in full deck →](https://bekanesp.github.io/didomi-zeroheight/slides/templates.html#s3) · [Open standalone →](https://bekanesp.github.io/didomi-zeroheight/slides/preview.html?slide=3)

## Screenshot

![Stat callout](https://bekanesp.github.io/didomi-zeroheight/out/thumbs/slide-03.png)

## Usage rules

- Lead with the statement, the number, then the qualifier. Bolds (`<b>`) on the number and one qualifier word only.
- The 5×5 hand grid lights 5 of 25 cells = 20%. Swap the hand SVG for another outline glyph when the stat isn't about people.
- Don't mix this with `.section-hd` — pick one or the other for a section transition.

## HTML snippet (copy-paste)

```html
<section class="bg-navy stat-slide" data-label="Stat callout">
    <div class="grad"></div><div class="grain"></div>
    <div class="logo-bar">
      <img src="../design-system/assets/logos/didomi-logo-white.svg" alt="Didomi"/>
    </div>
    <div class="text">
      On average,<br/>
      <b>20%</b> of people that<br/>
      visit your website<br/>
      use an <b>ad blocker</b>
    </div>
    <div class="grid-vis">
      <!-- 25 hands, ~5 highlighted (20%) -->
      <script>/* generated below */</script>
      <!-- 5 columns × 5 rows = 25 -->
      <template id="hand-tpl"></template>
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
