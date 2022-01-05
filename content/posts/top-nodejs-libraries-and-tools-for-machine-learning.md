---
title: 'Top Node.js Libraries and Tools For Machine Learning'
slug: 'top-nodejs-libraries-and-tools-for-machine-learning'
date: '2018-12-19'
thumbnail: '/thumbnails/node.png'
tag: 'nodejs'
canonicalUrl: 'https://medium.com/crowdbotics/top-nodejs-libraries-and-tools-for-machine-learning-ae0c106c9a69'
---

> [Originally published at Crowdbotics](https://medium.com/crowdbotics/top-nodejs-libraries-and-tools-for-machine-learning-ae0c106c9a69)

Javascript is often thought of a web programming language but Javascript, and javascript frameworks such as NodeJS, have many applications apart from just web apps including desktop applications, mobile applications, embedded systems, and back-end development.

If you are in web development (as I am), and you also want to explore new applications in machine learning (as I do), you may be wondering, ‘do I have to wander spend time learning a whole new programming language to explore machine learning?’ No, in fact. Machine learning concepts can be explored with many different programming language and frameworks, including NodeJS.

In this article, I review some of the top machine learning libraries for NodeJS to help you get started.

## ml.js

This library is a collection of tools developed by the [mljs](https://github.com/mljs) organization. It includes a vast list of libraries under different categories such as unsupervised learning, supervised learning, artificial neural networks, regression, optimization, statistics, data processing, and math utilities.

Most of the libraries that are included in ml.js tend to be used in a web browser, but if you are looking to work with them in Node.js environment, you will find an npm package.

Check out some examples that use utilities from ml.js:

- [Naive-Bayes Classification](https://github.com/mljs/naive-bayes)

Each tool utility is available as a separate module so you do not have to install all of them at once, if there is no need too.

```shell
npm install ml-naivebayes
```

After installing the package, you can directly import your JavaScript project. ml.js even supports ES6 modules.

```js
import { GaussianNB } from 'ml-naivebayes';

var model = new GaussianNB();
model.train(Xtrain, Ytrain);

var predictions = model.predict(Xtest);
```

- [Finding a minimum value in an array](https://github.com/mljs/array/tree/master/packages/array-min)

All utilities that helps in transform and computing values using arrays are also packaged separately and are listed under `ml-array` which you can find [**here**](https://github.com/mljs/array)**.** For example, let us say you want to get a minimum value of all the inputs provided as an array. To do so, you will first install the utility `ml-array-min` .

```shell
npm install --save ml-array-min
```

Then you directly require it like below.

```js
import min from 'ml-array-min';

const result = min(\[1, 5, 3, 2, 4\]); // 1
```

To see the vast list of libraries that are included in `ml.js`, visit the link below.

[**mljs/ml**](https://github.com/mljs/ml)

## Brain.js

Brain.js is a library written in JavaScript for [**neural networks**](http://en.wikipedia.org/wiki/Artificial_neural_network) that can be used with Node.js as well as in the browser. You can simply access it and start using it by installing it through [npm](https://www.npmjs.com/package/brainjs). Since it is written in JavaScript, it has support for asynchronous to train network data using `trainAsync()` and support for streams as well.

Generally, neural networks are considered to be math-heavy sub-domain in machine learning. Brian.js does a great job simplifying the process of creating and training a neural network by utilizing the ease-of-use of JavaScript and by limiting the API to just a few method calls and options.

For example, to train a network to approximate the [XOR](https://en.wikipedia.org/wiki/Exclusive_or) function (which is one of the standard examples), you would need:

```js
var brain = require('brain');
var net = new brain.NeuralNetwork();

net.train(\[{input: \[0, 0\], output: \[0\]},
 {input: \[0, 1\], output: \[1\]},
 {input: \[1, 0\], output: \[1\]},
 {input: \[1, 1\], output: \[0\]}\]);

var output = net.run(\[1, 0\]); _// \[0.933\]_
```

This code creates a new network (`net`) and `train`s the network using an array of example. It then`run`s the network with an input of `[1, 0]`, which results in `[0.933]` .

There are various meaningful machine learning applications that use Brain.js. Take a look at this one: [**Cracking Captcha with Neural Networks**](http://codepen.io/birjolaxew/blog/cracking-captchas-with-neural-networks), in which the author uses captcha images for the dataset and uses image processing and Brain.js library to create a neural network that identifies each individual character.

Another example of Brain.js being used with React Native can be found [**here**](https://github.com/BrainJS/BrainJSReactNative).

[**BrainJS/brain.js**](https://github.com/BrainJS/brain.js)

## Synaptic

Synaptic is another JavaScript neural network for Node.js. It has a few built-in architectures like multilayer perceptrons, multilayer long-short term memory networks (LSTM), liquid state machines or _Hopfield_ networks, and a trainer capable of training different networks. It also works with your browser.

Check out the example below for predicting a next character in a stream of text based articles from Wikipedia using a long-short term memory.

Brain.js and Synaptic are both written in JavaScript. Surely, there will be similar use cases for Synaptic as the previous one.

I can give you one more reason to choose synaptic over Brain.js. It has more API functionalities than the previous library mentioned in this article. This certainly means Synaptic will have more use cases and also, It is also actively developed.

For example, you can train and teach a perceptron to learn an XOR:

```js
var myPerceptron = new Perceptron(2,3,1);
var myTrainer = new Trainer(myPerceptron);

myTrainer.XOR(); // { error: 0.004998819355993572, iterations: 21871, time: 356 }

myPerceptron.activate(\[0,0\]); // 0.0268581547421616
myPerceptron.activate(\[1,0\]); // 0.9829673642853368
myPerceptron.activate(\[0,1\]); // 0.9831714267395621
myPerceptron.activate(\[1,1\]); // 0.02128894618097928
```

Check out common use cases using this machine learning module such as:

- [Solving an XOR](http://caza.la/synaptic/#/xor)
- [Painting a picture](http://caza.la/synaptic/#/paint-an-image)
- [Reading from Wikipedia](http://caza.la/synaptic/#/wikipedia)

[**Synaptic - The javascript neural network library**](http://caza.la/synaptic/#/wikipedia)

## Limdu.js

Limdu.js is a machine learning framework for Node.js that supports Binary classification, multi-label classification, feature engineering, online learning and real-time classification. It is currently in alpha state and looking for contributors.

Check out the example below of how batch learning can be implemented with the help of Limdu.js

```js
var limdu = require('limdu');

var colorClassifier = new limdu.classifiers.NeuralNetwork();

colorClassifier.trainBatch(\[
 {input: { r: 0.03, g: 0.7, b: 0.5 }, output: 0}, // black
 {input: { r: 0.16, g: 0.09, b: 0.2 }, output: 1}, // white
 {input: { r: 0.5, g: 0.5, b: 1.0 }, output: 1} // white
\]);

console.log(colorClassifier.classify({ r: 1, g: 0.4, b: 0 }));
// 0.99 - almost white
```

In the above example, an array as resource is provided to train the batch of key value pairs in the form of input and output.

Other use cases for this library can be found in the link below. Some of them are listed here:

- Serialization: you might want to train a classifier on your home computer, and use it on a remote server. To do this, you should somehow convert the trained classifier to a string, send the string to the remote server, and deserialize it there.
- Mutli-label classification: In binary classification, you get the output either as `0` or `1` . On multi-label, , the output is a set of zero or more labels.

[**erelsgl/limdu**](https://github.com/erelsgl/limdu)

> [**Try out the Crowdbotics application builder to instantly scaffold and deploy a Node app.**](https://app.crowdbotics.com/accounts/login/?utm_campaign=v1&utm_source=blog-post&utm_medium=Medium&utm_content=app-builder)

## ConvNetJS

The ConvNetJS JavaScript implementation of neural networks that is developed by a Stanford University PhD. It currently supports common neural network modules, SVM, regression, and the ability train convolutional networks to process images.

It has [great documentation](http://cs.stanford.edu/people/karpathy/convnetjs/docs.html), as well as [in-browser examples](http://cs.stanford.edu/people/karpathy/convnetjs/demo/mnist.html). Here are some use cases where you can see ConvNetJS in action:

- [Image Painting (Regreesion)](https://cs.stanford.edu/~karpathy/convnetjs/demo/image_regression.html)
- [Training an Autoencoder on MNIST digits](http://cs.stanford.edu/~karpathy/convnetjs/demo/autoencoder.html)
- [Speedtest](https://github.com/karpathy/convnetjs/blob/master/demo/speedtest.html)

[**karpathy/convnetjs**](https://github.com/karpathy/convnetjs)

### Stdlib

Stdlib is a JavaScript library which can be used to build advanced statistical models and machine learning libraries. It can also be used for plotting and graphics functionality for data visualization and exploratory data analysis. Stdlib supports in the form of different libraries such as linear regression, binary classification, and natural language processing.

This library is huge when it comes to providing support in the form of tooling. Some of the advantages it posses are :

- It has its own REPL environment with integrated help and examples.
- Native add-ons for interfacing with BLAS libraries, with pure JavaScript fallbacks.
- 50+ [sample datasets](https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/datasets) for testing and development.
- 200+ [assertion utilities](https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/assert) for data validation and feature detection.
- 200+ general [utilities](https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/utils) for data transformation, functional programming, and asynchronous control flow.
- Can be bundled using Browserify, Webpack, and other bundlers for use in web browsers.

[**stdlib-js/stdlib**](https://github.com/stdlib-js/stdlib)

## TensorFlow.js

[TensorFlow](https://medium.com/u/b1d410cb9700) is an open-source hardware-accelerated JavaScript library for training and deploying machine learning models. It is one of the most popular libraries out there. You can use flexible and easy to pick APIs to build models from scratch using the low-level JavaScript linear algebra library or the high-level layers API.

You will find more implementations of TensorFlow rather than any other library mentioned in this article. There is a reason for that. Not only it is actively maintained, it lets you write, train, and deploy your GPU-based DL models all in JavaScript.

Check out some live use cases for Tensorflow:

- [EMOJI SCAVENGER HUNT](https://emojiscavengerhunt.withgoogle.com/)
- [WEBCAM CONTROLLER](https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html)
- [NODE.JS: PITCH PREDICTION](https://github.com/tensorflow/tfjs-examples/tree/master/baseball-node)

It has vast variety of tutorials and guides listed officially on its website [**here**](https://js.tensorflow.org/tutorials/) to get you started. It also provide model converters to run pre-existing TensorFlow models right in the browser or under Node.js.

[**tensorflow/tfjs**](https://github.com/tensorflow/tfjs)

## KerasJS

It is similar to Tensorflow.js in many ways. One of the similarities is that Keras has support for high-level APIs that take care of abstraction provided by backend frameworks. Using Keras, models can be trained in any backend and you can even hook Tensorflow for that.

Offical KerasJS library offers many use cases in different domains such as:

- Basic Convnet for MNIST
- Convolutional Variational Autoencoder, trained on MNIST
- Auxiliary Classifier Generative Adversarial Networks (AC-GAN) on MNIST
- 50-layer Residual Network, trained on ImageNet
- Inception v3, trained on ImageNet
- DenseNet-121, trained on ImageNet
- SqueezeNet v1.1, trained on ImageNet
- Bidirectional LSTM for IMDB sentiment classification

Another thing about these use cases are that all of them are written in [**VueJS**](https://vuejs.org/).

While much of the use case for this library lies in using directly with a web based browser. However, to use Keras with Node.js, there is one limitation you will have to be aware of: the Node.js models only run in CPU mode.

[**transcranial/keras-js**](https://github.com/transcranial/keras-js)

## NeuroJS

NeuroJS is a JavaScript framework for deep learning. It mainly focuses on reinforcement learning, but can be used for any neural network based task. It contains neat demos to visualize these capabilities, for instance a 2D self-driving car. It also include support for Support for deep-q-networks and actor-critic models.

A complete list of its features are listed below:

- Implements a full-stack neural-network based machine learning framework
- Extended reinforcement-learning support
- Support for deep-q-networks and actor-critic models (via deep-deterministic-policy-gradients)
- Binary import and export of network configurations (weights etc.)
- High-performance

[**janhuenermann/neurojs**](https://github.com/janhuenermann/neurojs)

## Mind

Another flexible neural network library for Node.js, it uses matrix implementation to process training data. It does allow you to configure the network topology and use community made plugins. These plugins generally provide a way to configure pre-trained networks that can go straight to making predictions.

To create a plugin, simply call `download` on your trained mind:

```js
const Mind = require('node-mind')

const mind = Mind()
 .learn(\[
 { input: \[0, 0\], output: \[ 0 \] },
 { input: \[0, 1\], output: \[ 1 \] },
 { input: \[1, 0\], output: \[ 1 \] },
 { input: \[1, 1\], output: \[ 0 \] }
 \]);

const xor = mind.download()
```

Steven, the author, has written a 2 part tutorial on building neural networks by using _Mind_ ([Part 1](http://stevenmiller888.github.io/mind-how-to-build-a-neural-network) | [Part 2](http://stevenmiller888.github.io/mind-how-to-build-a-neural-network-part-2)). This series offer a lot more information than simply how to use _Mind_. Also, check out a live [**demo**](http://stevenmiller888.github.io/mindjs.net/) of a movie recommendation engine built with Mind.

[**stevenmiller888/mind**](https://github.com/stevenmiller888/mind)

## Natural

Natural is a library that provides tokenzing, stemming, classification, phonetics, tf-idf, WordNet, and string similarity. In other words, this library provide language facilities that you can use a module in Node.js. This is an interesting project with a variety of use cases.

All of these utilities are bundled together and provided as a package that can be easily installed via `npm` : `npm install -S natural`

As it seems this library is still in early stages and most of the algorithms are English-specific but recent community based contributors have implemented support for other language such as Russian and Spanish.

[**NaturalNode/natural**](https://github.com/NaturalNode/natural)

## Compromise

Another natural language processing that is only `230kb` minified when used in the browser. It is an advantage of using this library as compared to the previously mentioned, Natural.

This library provides lot of utilities that are basic and effortless, as well as support community made plugins to extend and use pre-configuration that allow adding vocabulary, fixing errors, and setting context quickly.

Apart from English, support for languages including German and French is still a _work in progress._

[**spencermountain/compromise**](https://github.com/spencermountain/compromise)

## Conclusion

JavaScript might be not a go-to programming language for machine learning yet, but the many powerful libraries listed here prove that JavaScript is not behind the curve when it come to machine learning applications.

Many machine learning library developers and teams write libraries using using C, LIBSVM, LIBLINEAR, and so on. These can be implemented in Node.js too, using native extensions provided by the Node.js core APIs.

I hope, this post prove useful to you as well for learning and using different libraries mentioned in your Node.js application.
