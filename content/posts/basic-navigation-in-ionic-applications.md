---
title: 'Basic Navigation in Ionic Applications'
date: '2017-10-31'
thumbnail: '/thumbnails/ionic.png'
slug: 'basic-navigation-in-ionic-applications'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/https-medium-com-amanhimself-basic-navigation-in-ionic-applications-ecb199cdf15b'
---

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/https-medium-com-amanhimself-basic-navigation-in-ionic-applications-ecb199cdf15b)

Navigation in Ionic does not work using normal routing like you might have done in some of the client side web frameworks, especially when compared to browser based navigation. It uses the terminology of `pages` which I find is more generalised and correctly named as compared Ionic version 1's `states`. This approach is quite similar to navigation in a native mobile application.

Pages are _pushed_ and _popped_ from the navigation controller a class defined whose subclass available in Ionic is `ion-nav`. The logic here is equivalent to that of a stack. The purpose of `ion-nav` is to work with the navigation stack.

To define a nav bar in an ionic app:

```html
<!--Home.html-->
<ion-navbar>
  <ion-title> Ionic App </ion-title>
</ion-navbar>
```

Inside the typescript file associated to above HTML code, we will have access to Navigation Controller.

```ts
// home.ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {}
}
```

Thus, we can access `NavController` and it's properties such as `push` and `pop` to navigate to a different page or back to the previous page.

Note: _Deeplinking is available in Ionic with URLs but that is altogether a different topic._
