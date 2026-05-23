---
title: Loader patterns
section: Product
parent: Foundations
source_url: https://kleos.didomi.io/62b372835/p/326eba-loader-patterns
scraped_at: 2026-05-23T14:00:00Z
---

# Loader patterns

Didomi Console users are always faced with interface loading time. To make the user experience as smooth as possible, we display during load times different kind of loaders regarding the needs. Loader types are: **Global loader,** **Didomi loader, Skeleton loader, Progression bar, Processing loader.**

## Global loader

**The global loader is used when the console loads content between each section.** It is usually used before the skeleton loader.

![Global loader](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/c9165f39620a281766ce50)

### Global loader elements

![didomi standalone blue](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/95df8bcb1386fab1d42e7b)

![loader-circle](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/3769fce3e433b250a7bdeb)

## Didomi loader

**Didomi loader is the basic loader of the console.**

### Look & feel

**Didomi loader is generally used in modal.** It help to make the modal conversation flow smoother when a loading time is required after a user request inside the modal.

![Didomi loader 1](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/19a2b29e780b75afabc7e8)

![Didomi loader 2](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/fa635355dfc475315f85f1)

**More informations about** [Modals](https://zeroheight.com/62b372835/p/905ef0)

## Skeleton loader

**Skeleton loader is a loader representing the ghost of the final UI.** It allow user to keep a good structured view of the UI interface which is coming. It also help to avoid empty screens that can be considered as loading error of the Didomi Console. It give a good visual feedback of something happening without promising a short loading time.

### Look & feel

**Each component container is replaced by a light blue gradient color shape.** We always try to adapt the skeleton with real sizes and spaces of the UI design.

![Full page skeleton example](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/653e4ee0e9e7f29f6af3bd)

**Here, full page is loading:**

- Top bar
- Side bar menu
- Module zone (Feature Content)

![PreferenceCenter - skeleton](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/68c9efd2f6958b85373737)

**Here, elements still loading:**

- Purpose cards
- Preference cards

### Gradient color specifications

**A light blue gradient is applied to the containers being loaded.** A css animation moves the gradient by shifting the colour values from left to right.

![Gradient color spec](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/16b27c0284a19c672d7f3b)

### Where to use

**Skeleton loader is used for all pages on all features.** A ghost UI of a page must be created for each pages containing different structures.

## Progress bar

**The progress bar is a data table loader.** The progress bar is displayed between header row and rows when a user performs an action on a data table such as sorting values or increasing & decreasing the number of results per page in the pagination for example.

### Look & feel

![Progress bar](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/9d5b60b6a50e04204bc02a)

### Where to use

## Processing loader

**The processing loader is the smallest loading component of the Didomi console.** We use it for specific loading requests in data tables and especially for loads that can be very long, such as report processing. It helps the user to identify between several table rows where he has already performed processing actions.

### Look & feel

![Processing loader animation](https://kleos.didomi.io/uploads/4BpxoTOKUzegipS9gPL__Q.gif)

![Processing loader still](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/951de8930a40e3782add60)

### Behavior & variations

The processing icon is always **accompanied by a short text** expressing the type of loading. **The processing icon will turn all along the loading is in progress.**

![Processing behavior](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/97939eccc3270ee1484755)

### Where to use

**In data tables**

## Snackbar loader

**Snackbar loader is displayed when the Console must showcase an element regarding a user specific action.** The snackbar loader is a visual answer to explain something is happening by just catching the user eyes quickly.

### Look & feel

**You can see below the flow with loading snackbar**

![Snackbar loader flow](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/765579c4898e71090a38b4)

**1/** User click on view button

**2/** Loader snackbar appear on the bottom of the screen (eye catching) and disappear when loading is complete

**3/** A blank page with content is loaded and appear above the Console

## Ressource

[https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=1039%3A5626](https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=1039%3A5626)
