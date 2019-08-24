---
slug: google-sheets-nodejs
date: 2019-07-22
title: 'Visualize Google Sheets Data in a NodeJS App'
categories: ['nodejs']
description:  '---'
published: true
author: 'Aman Mittal'
banner:
---

![](https://blog.crowdbotics.com/content/images/2019/07/google-sheets-crowdbotics.jpg)

Google Spreadsheets and Nodejs might sound a strange combination, but the server side platform can be a great way to utilize the Google Drive API. In this tutorial, you are going to learn how to build a connect the two leveraging a Crowdbotics app.

## Table of Contents

- Requirements
- Setting up the project
- Create a spreadsheet with data
- Building the Server
- Creating Charts
- Conclusion

## Requiremnets

- Nodejs `v8.x.x` or higher installed along with npm/yarn as the package manager
- Crowdbotics App builder Platform account (_preferably log in with your valid Github ID_)
- Google ID to create a Spreadsheet with dummy data on Google Drive

## Setting up the project

To setup, a new project on Crowdbotics app builder platform, [visit this link](https://www.crowdbotics.com/app-builder-signup?utm_campaign=blog&utm_content=blog-nav) and create a new account. Once you have an individual account, access the app building platform with those credentials, and the dashboard screen will welcome you like below.

![ss1](https://blog.crowdbotics.com/content/images/2019/06/ss1-2.png)

In the **Others** section, as shown above, select the template `Others`, fill in the project name `googlesheets-nodejs` and click on the button **Create App**. This template lets you create a new project that can be highly customizable and useful if you are looking to build something of your own from scratch. Once the Github repository generates, you will be able to either download or clone that Github repository to your local development environment.

![ss2](https://blog.crowdbotics.com/content/images/2019/06/ss2-2.png)

Clone the following Github repo in your local development environment.

![ss3](https://blog.crowdbotics.com/content/images/2019/06/ss3-2.png)

After you have cloned the repository, execute the commands below in the order, they are specified but first, navigate inside the project directory from the terminal window.

```shell
# initialize a node project with a package.json file
npm init --yes

# create new files
touch index.js .env .gitignore

# install required dependencies
npm install --save express google-spreadsheets dotenv
```

The first command in the above snippet lets you initialize your project with `package.json` file. The second is to create essential project files that are required to build this application. Lastly, some dependencies to run the server and connect the Google Drive API.

## Create a spreadsheet with data

In this section, we are going to create a new spreadsheet with some mock data to display later. Open [drive.google.com](https://drive.google.com).

![ss13](https://blog.crowdbotics.com/content/images/2019/06/ss13.png)

From the sidebar menu, click on **Google Sheets** and click to create a new spreadsheet with **blank template**.

![ss14](https://blog.crowdbotics.com/content/images/2019/06/ss14.png)

Add the following data or your mock data to display.

![ss15](https://blog.crowdbotics.com/content/images/2019/06/ss15.png)

The first two columns in the spreadsheet are not the data we are going to display later. They only contain meta information. The chart type values are valid Google Charts values.

To read data from this spreadsheet in the Nodejs app, click the button **Share** from the top right side and click on the **Get shareable link** from the modal screen.

![ss16](https://blog.crowdbotics.com/content/images/2019/06/ss16.png)

This shareable link will give an URL that you can share with anyone, for them to view the spreadsheet. From this link, we are going to get them.

```shell
https://docs.google.com/spreadsheets/d/XXXX/edit?usp=sharing
```

The real value in place of these Xs is going to be the spreadsheet key that is required to read the data. Paste this value in the `.env` file.

```env
SPREADSHEET_KEY=XXXX
```

## Building the Server

In this section, by requiring dependencies needed, we are going to build a server endpoint that is going to serve the HTML web page to view the data visualization coming from the Google Spreadsheet we just created in the previous section.

Open `index.js` file and start by requiring dependencies like `express`, `google-spreadhseets` and `dotenv`. Make sure you create an instance of Express app after you have needed environmental variables.

```js
const express = require('express')
const GoogleSpreadsheets = require('google-spreadsheets')

require('dotenv').config()

const app = express()
const port = 8000

// declare variable for charts
let charts

// bootstrap server
app.listen(port, () => {
  console.log(`App is running on port ${port}.`)
})
```

To load a spreadsheet from the API, `google-spreadsheets` has a method that requires the spreadsheet key we saved as the environment variable. This method also takes callback function and returns a `spreadsheet`.

```js
GoogleSpreadsheets(
  {
    key: process.env.SPREADSHEET_KEY
  },
  (err, spreadsheet) => {}
)
```

Using this `spreadsheet` object, you are going to access the single or the first worksheet. Then, to calculate the number of rows and columns to fetch the data from, grab the value from cells. `cells()` method helps you to load a specific group of cells. You have to specify a range of rows and columns to retrieve these cells.

```js
GoogleSpreadsheets(
  {
    key: process.env.SPREADSHEET_KEY
  },
  (err, spreadsheet) => {
    spreadsheet.worksheets[0].cells(
      {
        range: 'R1C1:R9C06'
      },
      (err, result) => {
        charts = result.cells
      }
    )
  }
)
```

The `cells()` method accepts a callback to fetch all the required cells. Store these cells inside the variable we declared earlier called `charts`.

The snippet of code is going to serve the public folder and its contents, which we are going to create in the next section.

```js
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.get('/charts', (req, res) => {
  res.send(charts)
})
```

The endpoint `/charts` is going to serve the data incoming from the spreadsheet to the client.

## Creating Charts

To create charts and keep thing simple, we are going to use jQuery. On the client side, the method `$.get()` is going to load the data from the server. The server endpoint `/charts` is serving the data the client side requires. We are also going to make use of a jQuery plugin known as Gridster.

This plugin will enable to use of drag-and-drop column approach by allowing our client to behave like a draggable layout. The gridster plugin does allow to specify the space between each chart. For now, let us set this to `5px`. The property `widget_margins` is used for this purpose. It takes the combination of width and height values. The `widget_base_dimensions` is to specify the width and height of the draggable grid.

Create a new file called `public/client.js` and add the following snippet.

```js
$(function() {
  $.get('/charts', function(charts) {
    var dataStr = ''
    var imgStr = ''
    var gridster = $('section#charts')
      .gridster({
        widget_margins: [5, 5],
        widget_base_dimensions: [255, 155]
      })
      .data('gridster')
    var carray = $.map(charts, function(value, index) {
      return [value]
    })
    for (var i = 1; i < carray.length; i++) {
      var rarray = $.map(carray[i], function(value, index) {
        return [value]
      })
      for (var j = 2; j < rarray.length; j++) {
        dataStr += rarray[j].value
        if (rarray[j + 1]) dataStr += ','
      }

      imgStr =
        '<img src="//chart.googleapis.com/chart?cht=' +
        rarray[0].value +
        '&chtt=' +
        rarray[1].value +
        '&chs=250x150&chd=t:' +
        dataStr +
        '&chxt=x,y&chxs=0,c0c0c0,10,0,lt|1,c0c0c0,10,1,lt&chco=000000" />'

      gridster.add_widget(
        '<span id="chart' + i + '">' + imgStr + '</span>',
        1,
        1
      )
      dataStr = ''
    }
  })
})
```

The data coming from `/charts` endpoint from the server is processed inside a loop. This loop runs over each row. Next, looping through each column in the above snippet, we have to skip column 1 and column 2 since they contain meta information about the spreadsheet itself.

In order to display charts, we are using to use [Google Charts](https://developers.google.com/chart/), which is a free API. This API will help us to visualize the data incoming from the Google spreadsheet. This API allows creating a chart image with just values in a URL. This image can be treated like a normal image. In the above snippet, we are using the `<img />` tag for this.

Open `views/index.html` file and add the following snippet of code.

```js
<!DOCTYPE html>
<html>
    <head>
        <title>Google Sheets + Nodejs Dashboard</title>
        <meta name="description" content="Google Sheets + Nodejs Dashboard />
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/jquery.gridster.min.css" />
    </head>
    <body>
        <header>
            <h4>
                Google Sheets + Nodejs Dashboard
            </h4>
        </header>
        <br />
        <main>
            <section id="charts"></section>
        </main>

        <script
            src="https://code.jquery.com/jquery-2.2.1.min.js"
            integrity="sha256-gvQgAFzTH6trSrAWoH1iPo9Xc96QxSZ3feW6kem+O00="
            crossorigin="anonymous"
        ></script>
        <script src="/jquery.gridster.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="/client.js"></script>
    </body>
</html>
```

Start the server in the terminal window with by executing the command `node index.js` and visit the URL `http://localhost:8000` from a browser window. You will get the following result.

![ss17](https://blog.crowdbotics.com/content/images/2019/06/ss17.png)

## Conclusion

I hope you understood the main purpose of this tutorial, which was to use a spreadsheet to read the data within a Nodejs application. To extend this application, you can try by adding authentication the spreadsheet. More information on this can be found in the [documentation](https://github.com/samcday/node-google-spreadsheets) of the npm we used for the demonstration.

> [Originally published at Crowdbotics](https://blog.crowdbotics.com/google-sheets-nodejs/)
