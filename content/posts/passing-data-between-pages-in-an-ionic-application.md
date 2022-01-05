---
date: '2017-12-03'
title: 'Passing Data Between Pages in an Ionic Application'
thumbnail: '/thumbnails/ionic.png'
slug: 'passing-data-between-pages-in-an-ionic-application'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/passing-data-between-pages-in-an-ionic-application-129b387c93b8'
---

In the previous posts, we have seen [how to setup a basic navigation between multiple Ionic app Pages](https://hackernoon.com/https-medium-com-amanhimself-basic-navigation-in-ionic-applications-ecb199cdf15b). This post concerns what if you want to send some data from the previous page to the next page in the stack? For the Ionic provides `NavParams` class to transfer data from one page to another.

### Generate the application

In this demo application we will first setup a home page with a text box to enter data that will be transfered to the next page. First, let’s generate a new Ionic application:

```shell
$ ionic start -a 'Passing Data between Pages' -i
app.passdata.pages ionic-pass-data-pages blank
```

Create a new about page:

```shell
$ ionic g page about
```

And lastly, to complete our setup, we must add about page in the app module:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [MyApp, HomePage, AboutPage],
  imports: [BrowserModule, IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, AboutPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
```

### Add Input Text in Home Page

Then we will update `home.html`:

```html
<ion-header>
  <ion-navbar>
    <ion-title> Passing Data in Pages </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item>
      <ion-label>Enter</ion-label>
      <ion-input placeholder="Your fav color..." #color></ion-input>
    </ion-item>
  </ion-list>
  <button
    ion-button
    color="secondary"
    (click)="goTo(color.
  value)"
  >
    About Page
  </button>
</ion-content>
```

`#color` is a local variable whose value we will be referencing to pass on to the next page in our navigation stack. We will now update our `home.ts` with business logic behind the only click event in our template:

```ts
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from './../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  goTo(color) {
    color = color || 'No Color Entered';

    this.navCtrl.push(AboutPage, {
      data: color
    });
  }
}
```

Note the second argument in `this.navCtrl.push()` which is being used to pass the data.

### About Page

To Pass data from Home page to About page we will need to import `NavParams` class. Since, I am using Ionic CLI to generate pages, class `NavParams` will already be imported in the about page.

```ts
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  color: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.color = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }
}
```

### Display Fetched Data

To catch the data from the previous page in the navigation stack, we are using `get()` method of `NavParams` class. We fetch data inside the constructor function of `AboutPage` class.

Finally, to display data on about page:

```html
<ion-header>
  <ion-navbar>
    <ion-title>About</ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <label>Color Entered: {{color}}</label>
</ion-content>
```

### Summary

Here are some screenshots:

Home Page:

<img src='https://cdn-images-1.medium.com/max/800/0*eftZuH7QmZQqs4-Y.png' />

User Input being entered:

<img src='https://cdn-images-1.medium.com/max/800/0*g25oMDTJV3TS7mTB.png' />

Data passed form Home Page displayed on About Page:

<img src='https://cdn-images-1.medium.com/max/800/0*ay_xx0zGGCDDuXXY.png' />

When nothing entered in the input field, a default text passed and displayed:

<img src='https://cdn-images-1.medium.com/max/800/0*5lhp42R9R5pQVjSi.png' />

_To get the full code of this demo app, you can visit_ [**this Github Repository**](https://github.com/amandeepmittal/ionic-pass-data-pages).

> [Originally Published at Hackernoon.com](https://medium.com/hackernoon/passing-data-between-pages-in-an-ionic-application-129b387c93b8)
