---
title: 'The No-Code Way of Payments with Stripe: A Brief Guide'
date: 2021-07-08
slug: 'blog/no-code-way-of-payments-with-stripe-a-brief-guide'
template: post
thumbnail: '../thumbnails/stripe.png'
tags:
  - no-code
canonicalUrl: 'https://amanhimself.dev/blog/no-code-way-of-payments-with-stripe-a-brief-guide/'
---

![cover_image](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FoBJp5NI1CqWkTYoCtrcit0KrDza2-lc3035ge.jpeg&w=3840&q=75)

> Cover image credit: [Prayer X](https://unsplash.com/@x_prayer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/galaxy?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Stripe launched a new way to accept payments via [Payment Links](https://stripe.com/en-sg/payments/payment-links) recently. It's a big deal for many use-cases. I got to know about it after trying to figure out how to support payments for offline goods and services in an Expo app using [managed workflow](https://docs.expo.io/introduction/managed-vs-bare/?ref=hackernoon.com#managed-workflow). Yes, that's a niche use case. But Stripe's no-code way to enable payments in an app goes beyond that.

Disclaimer: This article is not a take on code. I love to code. It's an appreciation post on how integration utilities like Stripe Payment Links come in handy far beyond code.

> Stripe Payment Links are not meant to be used as an alternative to native in-app purchase functionality. Please make sure to read [Apple's App Store review guidelines](https://developer.apple.com/app-store/review/guidelines/?ref=hackernoon.com#other-purchase-methods) to have clear instructions on what Goods and Services are available for outside of the in-app purchases when publishing the app.

## Why a Payment Link?

Accepting payments using a payment provider like Stripe includes a three-step process:

- A server or serverless functions to handle logic, create tokens and secret keys.
- UI for customers to enter their details when purchasing a product.
- Tracking each transaction using [PaymentIntent](https://stripe.com/docs/payments/payment-intents).

Stripe Payment Links handle this process by giving you a layer of UI and a URL for the payment. Yes! Now, for the use case that I have, I do not have to write different serverless functions, host them on a backendless service like Firebase Cloud functions, or think about their technical maintenance over time.

The Payment Links work when you host a product using Stripe. It gives you an interface to create and host a product.

## How to create a Payment Link

Go to the Stripe Dashboard screen. From the side menu, go to Products and then click Payment Links. The example below is using Test mode, but the same process is applicable when in live mode.

![ss1](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FoBJp5NI1CqWkTYoCtrcit0KrDza2-841335vt.jpeg&w=3840&q=75)

- Click the button "New" to add a new product and create a payment link for it.
- Then, under the Product section, click "+ Add a new product".
- Enter the details of the product.After adding the product details, click the button Create link.
- Stripe generates a Payment link for the product added.

![ss2](https://hackernoon.com/_next/image?url=https%3A%2F%2Fcdn.hackernoon.com%2Fimages%2FoBJp5NI1CqWkTYoCtrcit0KrDza2-q01m35p1.gif&w=3840&q=75)

While adding a new product, Stripe allows customizing product details by adding promotional codes, collecting a user's shipping, billing address, adjust quantity, etc. Managing a user's shipping and billing address is essential if the product sold is a physical entity.

## Conclusion

You can now use it inside low and no-code tools like [Webflow](https://webflow.com/) or mobile apps created using [Draftbit](https://draftbit.com/?ref=hackernoon.com).

I also wrote a post on how to use Stripe Payment Links when creating a mobile app using Draftbit as a "pro code" tool to build the mobile app. **[Learn more ↗️](https://community.draftbit.com/c/code-snippets/send-payments-with-stripe-in-draftbit)**

![demo-draftbit](https://i.imgur.com/VgrEdI5.gif)
