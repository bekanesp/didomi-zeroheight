---
title: Sticky bottom bar
section: Product
parent: Blocks
source_url: https://kleos.didomi.io/62b372835/p/18d643-sticky-bottom-bar
scraped_at: 2026-05-23T14:00:00Z
---

# Sticky bottom bar

Sticky bottom bar is a contextual panel coming from the bottom of the screen. This is principally used to show the number and the type of files the user is going to extract.

### Composition

![Composition](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/4b9b490a45baddb0bf6044)

**1.** Container
**2.** Confirmation icon
**3.** Number of file selected
**4.** Extraction button
**5.** Close button

### Architecture

**All the elements (icons, text, buttons) inside bottom sticky bar are always vertically centered.**

![Architecture](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/c4d4d97ad9d27dde2b67c2)

### Colors & fonts

![Sticky-bottom-Colors and fonts](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/ea97ff311f9c8607caf8d5)

### Resizing behavior

![Resizing behavior](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/b63fcd80aae4d07671c00d)

### Placement

**Sticky bottom bar appear only when the user wants to extract an element from a table with row extraction option.** It come from the outside and stick smoothly to the bottom of the screen. The bottom sticky bar still displayed until the user click on extract or on close button.

![Placement](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/0753fffe42c417b30ef040)

## BottomBar Component

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| Button text | The text of the CTA (string) | - |  |
| Variant | Defines the button purpose (string) | main | main, light |
| Icon | The name of the icon to show (string) | - |  |
| Text | The text to display (string) | - |  |
| isOpen | Whether the bar is open (boolean) |  | True, False |
| closable | Whether the bar can be closed by the user (boolean) | - | True, False |

## Stories

- Didomi Bottom Bar Not Closable — "2 Reports / Save"
- Didomi Bottom Bar Without Icon — "2 Reports / Save"
- Didomi Bottom Bar With Actions Slot — "2 users selected / Admin / Editor / No Access / Save"
- Didomi Bottom Bar Light — "Create"

### Resources

[Figma: ATOMS — BottomBar](https://www.figma.com/file/U2II57dVkLUtwHMXgDCA71/ATOMS?node-id=1048%3A13036)
