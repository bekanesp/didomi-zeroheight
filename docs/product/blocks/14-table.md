---
title: Table
section: Product
parent: Blocks
source_url: https://kleos.didomi.io/62b372835/p/39e57e-table
scraped_at: 2026-05-23T14:00:00Z
---

# Table

Tables allow to display several datas between rows and columns. The tables must be able to adapt their content and their interaction components related to the needs. You can see below the main architecture and main table content.

- [Desktop version](https://kleos.didomi.io/62b372835/p/39e57e-table/b/42e39e)
- [Mobile version](https://kleos.didomi.io/62b372835/p/39e57e-table/b/66add8)

## Architecture

You can see below History logs table as an example.

### Table elements behavior

To keep a good readability and understanding of the table columns when a lot of results are displayed, we keep the **"header row"** during the scroll.

The **"Header row"** is stuck to the top of the page (rule must be defined) so the user always has an eye on the meaning of the data he is scrolling.

### Header row checkbox behavior

### Sort arrows behavior

### Tooltips placement

## Header row

### Main architecture

### Colors & fonts

## Rows

**Rows are used to display columns contents.** We can nested different kind of data and components inside it. You can find below examples of rows types and variations.

### Main architecture

### Colors & fonts

### Content variations

**Related to the needs, a row can contain several elements.** You can see below some examples (not exhaustives) of rows content.

### Row states

### Icon button states

## Pagination

**Pagination module** is used to allow the user to change number of rows per pages and to switch from page to page.

### Composition

### Main architecture

### Colors & fonts

### Dropdown behavior

## Paginator Component

| Name | Description | Default | Control |
| --- | --- | --- | --- |
| Page | Defines the current active page (number) | 1 |  |
| Size | Defines the pagination size (number) | 10 | 5, 10, 20, 30, 40 |
| Item count | Defines the total amount of items (number) | - |  |
| Variant | Defines the variant (string) | normal | normal, compact |
| Disabled | Disables the button (boolean) | false | True, False |

## Stories

- Paginator Other Page — "41-60 of 205"
- Paginator Last Page — "201-205 of 205"
- Paginator Disabled — "181-200 of 205"
- Paginator Mobile — "9 10 11"

## Resources

[Figma: BLOCKS — Table](https://www.figma.com/file/EEd69cGhLBc8UqFgSyFzKA/BLOCKS?node-id=1289%3A812)
