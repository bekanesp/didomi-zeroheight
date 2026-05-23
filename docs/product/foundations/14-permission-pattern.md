---
title: Permission pattern
section: Product
parent: Foundations
source_url: https://kleos.didomi.io/62b372835/p/18c57d-permission-pattern
scraped_at: 2026-05-23T14:00:00Z
---

# Permission pattern

Permission pattern allow us to define the behavior of the interface when a user is restricted by a role in the console. **3 roles are available: No access, Viewer access, Editor**

[No access](https://kleos.didomi.io/62b372835/p/18c57d-permission-pattern/b/77e30e)

[Viewer access](https://kleos.didomi.io/62b372835/p/18c57d-permission-pattern/b/62bb95)

[Editor](https://kleos.didomi.io/62b372835/p/18c57d-permission-pattern/b/779a93)

## No access

### Main permissions

_The main actions allowed by a_ **_No access_** _are the following:_

- On the first level of a feature containing tabs user can see the label of the tab but content is locked _(we decided to let the user see the global structure to understand the architecture and request permissions to the administrator if needed)_

## Sidebar menu display

![Sidebar menu display](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/8ea2e16984e4261e2925be)

## Top bar menu display

![Top bar menu display](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/2c1ac7e7af506d6d4b203a)

## Main tab

![Main tab](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/2f6eaee794b1879550288b)

## No access from an URL

### Edge case

If the user tries to access to an unauthorized page from an URL, he lands on a screen explaining that he don't have access to the content.

[https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=2328%3A12927](https://www.figma.com/file/eSe9Rarck9gkSmq8cZe53M/FOUNDATION?node-id=2328%3A12927)

![lookandfeel-unauthorized-page](https://zeroheight-uploads.s3.eu-west-1.amazonaws.com/8ea45e09c8915109a9520a)

**You can read the notion page defining the behavior of the main roles:** [https://www.notion.so/74c374bbe2ee4337a018b2e982b5615a?v=596272561b7544d9bd6ce0552443f9db](https://www.notion.so/74c374bbe2ee4337a018b2e982b5615a?v=596272561b7544d9bd6ce0552443f9db)
