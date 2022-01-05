---
date: '2017-11-09'
title: 'Using Google Fonts in an Ionic Application'
thumbnail: '/thumbnails/ionic.png'
slug: 'using-google-fonts-in-an-ionic-application'
tag: 'ionic'
canonicalUrl: 'https://medium.com/hackernoon/using-google-fonts-in-an-ionic-application-c3419c342f23'
---

In this post, I will be showing you to change font in any Ionic 2/3 application. To start with, I will be setting up a new ionic project such that you can refer back to on Github.

```shell
$ ionic start ionic-use-google-fonts blank
```

`cd` in to the new project created by the above Ionic CLI command and run `ionic serve` to see the blank template with just a homepage available. As of now, the Ionic application looks like this:

<img src='https://cdn-images-1.medium.com/max/800/0*WUHLVkBP7bifnV8E.png' />

The font here used in the application at global level is default. We will be changing it to [Revalia](https://fonts.google.com/specimen/Revalia). It’s just a random suggestion, you can pick whatever you want but I’d suggest, if you are doing for the first time or new to Ionic development, pick a font in which you can see the changes reflected in the app.

<img src='https://cdn-images-1.medium.com/max/2560/0*NTLwsXqYlk1SPFPD.png' />

After selecting the font, open the highlighted link in the screenshot above, in a new tab.

<img src='https://cdn-images-1.medium.com/max/2560/0*Ok2hQifn4QpJFSsM.png' />

Again, open the link provided in the `latin` section, just like in the above image and download or save the file directly in you ionic project.

The location to save the file will be `YOUR-IonicApp > src/assets/fonts`. Create a new directory `fonts` in the `assets` folder if not available. Place the file there, and rename it as per your convenience.

<img src='https://cdn-images-1.medium.com/max/800/0*KIBUq3X7G1JztbmK.png' />

Now since we want this font to be used at the global level of application, open `app.scss` in `src/app` and first include the local file of the font we want to use and then use that font at global level by using an asterisk `*` as css-selector:

```css
@font-face {
  font-family: 'Revalia';
  src: url('../assets/fonts/revalia.woff2') format('woff2');
}

* {
  font-family: Revalia;
}
```

Run the ionic application with:

```shell
$ ionic serve
```

Output:

<img src='https://cdn-images-1.medium.com/max/800/0*cAeEa-sD5b1zHVNG.png' />

To get the full code, you can visit [**this Github Repository**](https://github.com/amandeepmittal/ionic-use-google-fonts).

[Originally Published at Hackernoon.com](https://medium.com/hackernoon/using-google-fonts-in-an-ionic-application-c3419c342f23)
