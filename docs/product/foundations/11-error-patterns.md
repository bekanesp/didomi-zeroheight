---
title: Error patterns
section: Product
parent: Foundations
source_url: https://kleos.didomi.io/62b372835/p/05db85-error-patterns
scraped_at: 2026-05-23T14:00:00Z
---

# Error patterns

Errors in the Didomi Console are displayed by error types. We defined simple rules to apply regarding **user actions errors** and **backend errors.** You can see below all the specifications to apply to keep consistency in the user experience when an error occur.

## Usage

### Error types

**Errors occur when the Console fails to complete an action, such as:**

**1/** Didomi Console does not understand user input

**2/** User action requests can not be achieved because of Console backend fails

### Error rules

**To address errors in the Didomi Console:**

**1/** **We always give a clear feedback** to users of whats happen _(we use a warmed tone of voice and be friendly as much as possible)_

**2/** We always explain to the user **what are the possibilities to resolve or the reasons of the error** _(e.g.: action buttons to retry, reload, well defined helper text and error text for a better understanding etc...)_

**3/** Forms: **We always preserve user-entered input to show whats wrong** _(user is easily able to compare he's inputs and the initial request)_

## Error patterns

### Text field input errors

**Text field inputs errors help users to fix errors as soon as they are detected.** Helper text clearly explain the error and how to fix it.

![Text field input errors](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/4e24c8f4f7ab619742829d)

To bring to users a good understanding of inputs requests we defined **Helper text** & **Error text.**

**Helper text** may be included before & during a user interacts with each field on a form.

![Helper text](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/1c5b18e1f6d6339da65c2b)

**Font Token:**

`field-helper-text`

**Space Token:**

`space-xxs` (8px) between `field-label` and `field-helper-text`

`space-xxxs` (4px) between `field-helper-text` and Field container

**Error text** appear when a _required*_ field is not filled, when the user filling is not adapted to the request, or when submission button is clicked before totally filling the form. **Red border** is applied to the field to highlight error place and a **Warning Icon** appear on the right side of the field.

![Error text](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/05451c677e4ada04cb6854)

**Space Token:**

`space-xxxs` (16px) between `field-helper-text` and **Field below**

`space-xxs` (24px) between `field-helper-text` and **submission button**

![Error spacing](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/44bb8405200c4bfa2343a4)

**Font Token:** `field-helper-tex`

**Border Color Token:** `red-4`

**Space Token:** `space-xxxs` (4px) between `field-helper-text` and Field container

### Console backend errors

Console backend errors occur when a request for action from the user is sent but cannot be executed normally or by the console. In this case, **we use an error snackbar and/or empty status** to give the user feedback and explain what is happening.

#### We have identified three specific rules.

### 1/ If the data we need to display are independent:

We are retrieving data from different access points. You can see below an example where we try to load the data from the configuration tree on the left and the contents of the preferences library on the right.

**An empty state with an error message is displayed for both independently inside their own container. User can reload separately each container.**

- Preference Center example

![Preference Center example](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/87398e0caad89e7d677c2f)

- Multi table example

![Multi table example](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/ffc04a75cd418b891ccba1)

### 2/ If the data we need to display comes from the same endpoints:

We are retrieving data from the same access points. You can see below an example where we try to load a data table.

**An empty status and an error snackbar are displayed. The user is prompted to reload the table using the snackbar button.**

![Same endpoint error](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/433c831107f94052b61fc9)

### 3/ If the console is totally not available:

Unexpected errors may appear when the console is not able to retrieve the data to be displayed or any other error that prevents the console from working properly.

**For this cases we have defined a simple screen to help the user understand that something is wrong and that he should refresh the page.**

![Console unavailable](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/63c991e2aa634a632b0123)

### Look & feel

![Look and feel](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/7b2d8df5835457836cbdd8)

## Ressource

[https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=1039%3A3313](https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=1039%3A3313)
