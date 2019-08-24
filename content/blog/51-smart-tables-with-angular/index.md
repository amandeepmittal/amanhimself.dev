---
slug: smart-tables-with-angular
date: 2018-09-28
title: 'Smart Tables with Angular'
categories: ['angular']
description: '---'
published: true
author: 'Aman Mittal'
banner:
---

![](https://cdn-images-1.medium.com/max/800/1*vlmYqCaY0Lt7VMWJ1fslQg.png)

In this tutorial, we are going to learn how to integrate and use `ng2-smart-tables` with Angular 6. The `ng2-smart-table` is a library that is available to us as an npm package and pre-defined components and directives for sorting, searching, filtering and displaying data in the form of a table. To start, please run the following command from your terminal window to install the latest version of angular/cli.

```shell
npm install -g @angular/cli
```

If you already are using `angular/cli` version above 6, please upgrade to the latest version. If it does not install then try in the `sudo` mode for unix based machines. `angular/cli` not only scaffolds a directory structure for a project but also take care of pre-configuration that is needed to an application. With the below command we generate our new project:

```shell
ng new smart-table-example
```

To see of everything is working fine, let us run `ng serve --open`. You can visit the URL `http://localhost:4200/` to see our newly created project in action.

![](https://cdn-images-1.medium.com/max/800/1*GonTIX4EiigfeiNPICtRlw.png)

### Installing rxjs-compat

Angular’s ecosystem struggles because of the compatibility issues of third party libraries whenever a new Angular version is released. Similar is happening in Angular 6. It depends on TypeScript 2.7 and RxJS version 6. Not many third party libraries have been updated and thus, to make them work with the latest Angular version, we are going to use another third party library in our app, called `rxjs-compat`.

```shell
npm i rxjs-compat --save
```

Please note that, in future, third party libraries might be compatible and do not need `rxjs-compat`. So check documentation of the third party library you are using with Angular 6.

### Installing the ng2-smart-table library

We can install it as a local dependency to our Angular project.

```shell
npm install --save ng2-smart-table@1.3.0
```

In any Angular application, `app.module.ts` is the global space for registering a module. Open it and add the following:

```ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { Ng2SmartTableModule } from 'ng2-smart-table' // add

import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    Ng2SmartTableModule // add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

If you get no errors at this step and the webpack has compiled our app successfully, this mean we can continue to work.

### Creating a Table

We will generate a component called `table` using `ng g c table`. The `ng` command will not only create a default component but also updates `app.module.ts` for us. You can fine our newly generated component inside `src/app/`. To see if it is working, we will import this table component inside `app.component.ts`.

```ts
import { Component } from '@angular/core'

// add the following
import { TableComponent } from './table/table.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smart-table-example'
}
```

Also modify the `app.component.html` file to render the table component.

```html
<div _style_="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>

  <img
    _width_\="300"
    _alt_\="Angular Logo"
    _src_\="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg=="
  />
</div>

<app-table></app-table>
```

![](https://cdn-images-1.medium.com/max/800/1*ZZmLA-5w2hHLWdAujLeW_w.png)

### Building the Backend

To serve data as an API to our Angular app we currently are going to create a mock backend server. Install `json-server` globally from npm.

```shell
npm install -g json-server
```

Now in our `src/` directory, create directory called data and inside it create a new file called `db.json`. We will be adding some mock data inside this file in JSON format. It will be easier to render JSON data in angular app.

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Jason Bourne",
      "employeeId": "us2323",
      "city": "New York"
    },
    {
      "id": 2,
      "name": "Mary",
      "employeeId": "us6432",
      "city": "San Jose"
    },
    {
      "id": 3,
      "name": "Sameer",
      "employeeId": "in2134",
      "city": "Mumbai"
    },
    {
      "id": 4,
      "name": "Sam Hiddlestone",
      "employeeId": "au9090",
      "city": "Melbourne"
    }
  ]
}
```

To serve this data to our angular application, in a separate terminal window, write the following command:

```shell
json-server --watch src/data/db.json --port 4000
```

You will be prompted with the following success message. Our data is accessible through the URL `[http://localhost:4000/employees](http://localhost:4000/employees.)`[.](http://localhost:4000/employees.)

![](https://cdn-images-1.medium.com/max/800/1*h2ceBEbRhEcxS4l9JDDS8Q.png)

### Fetching Data using HTTP Client

Most front end framework do not have a built in mechanism to fetch data from remote API or a server. However, Angular leverages in this case, its HTTP Client which allows us to fetch data from the remote API, in our case the JSON server data. To make use of it, first append the `app.module.ts` file.

```ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http' // add

import { Ng2SmartTableModule } from 'ng2-smart-table'

import { AppComponent } from './app.component'
import { TableComponent } from './table/table.component'

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [
    BrowserModule,
    Ng2SmartTableModule,
    HttpClientModule // add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Inside the `table` folder, create two new files. First, `Table.ts`: this file works as an schema design (if you think in terms of database) or an interface that let our Angular application know the type of data it is going to receive from the remote API. This will be helpful in creating a service, which is our next step.

```ts
export interface Table {
  id: Number
  name: String
  city: String
  employeeId: String
}
```

Second, is our service file `table.service.ts`. Our service file contain an injectable class called `TableService` which will fetch the data from the remote API using HTTP client.

```ts
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class TableService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:4000'
  getData() {
    return this.http.get(`${this.url}/employees`)
  }
}
```

Importing this service in `app.module.ts` as a provider which will enable our Table component to access it.

```ts
import { TableService } from './table/table.service';


// ...

providers: [TableService],
```

Next, we modify our `table.component.ts` and `table.component.html`.

```ts
import { Component, OnInit } from '@angular/core'
import { TableService } from './table.service'
import { Table } from './Table'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  employees: Table[]

  constructor(private tservice: TableService) {}

  ngOnInit() {
    this.tservice.getData().subscribe((data: Table[]) => {
      this.employees = data
    })
  }
}
```

```html
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>City</th>
      <th>Employee id</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let employee of employees">
      <td>{{ employee.id }}</td>
      <td>{{ employee.name }}</td>
      <td>{{ employee.city }}</td>
      <td>{{ employee.employeeId }}</td>
    </tr>
  </tbody>
</table>
```

If you get a similar result like below, depending on the amount of your data, this means you successfully created the Table Service and fetched the data from a remote API using `HttpClient`.

![](https://cdn-images-1.medium.com/max/800/1*PjcpUcLUxqN6wBoiz4TFcQ.png)

### Making our Table Smart

At this point, our table is just rendering as static and does not have any functionality provided by the ng2-smart-table library such as sorting, searching, etc. To make it dynamic, we need to add some configuration, which is a require step when working with `ng2-smart-table` library.

Create an object inside `table.component.ts` and call it `settings`. This object contain columns that are displayed on the table.

```ts
import { Component, OnInit } from '@angular/core'
import { TableService } from './table.service'
import { Table } from './Table'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  employees: Table[]

  // add this config
  settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Name'
      },
      city: {
        title: 'City'
      },
      employeeId: {
        title: 'Employee No.'
      }
    }
  }

  constructor(private tservice: TableService) {}

  ngOnInit() {
    this.tservice.getData().subscribe((data: Table[]) => {
      this.employees = data
    })
  }
}
```

The column name contain those fields that are coming from our service. The column name do not have to be identical with the original key. You can add or modify the name for a column using `title`. Another thing we need to add is called `source` which gives reference to of the actual data from our service to the ng2-smart-table directive. Yes, our list piece of puzzle to make our table dynamic is a directive provided by `ng2-smart-library` called the same. See it action `app.component.html` and replace our previous code.

```html
<ng2-smart-table [settings]="settings" [source]="employees"> </ng2-smart-table>
```

The `settings` is the same object that we defined in the `app.component.ts` The source is comping from Table service where we fetch data and make it available to our component using `this.employees`. Following is how your table will look now.

![](https://cdn-images-1.medium.com/max/800/1*qP25TQrQ0Ricepk8zzoZkA.png)

Try to play with it to explore its functionalities. Notice, how it automatically add by default various functionalities to edit and update or delete a field as well add a search bar over every column.

![](https://cdn-images-1.medium.com/max/800/1*Hn1ZYjFseg0BPkl2DNDnDw.gif)

It also add sorting functionality by default.

![](https://cdn-images-1.medium.com/max/800/1*oFRPCAzUfEtlIIBI50xYAQ.gif)

There are various advance configuration that ng2 table library provide to us. For example, to add a multi select checkbox, we can just edit the configuration or the settings object in our table component and this feature will be added to our existing table. Append `table.component.ts`

```ts
settings = {
  selectMode: 'multi', // just add this
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Name'
    },
    city: {
      title: 'City'
    },
    employeeId: {
      title: 'Employee No.'
    }
  }
}
```

And see yourself.

![](https://cdn-images-1.medium.com/max/800/1*VHrSa6qMWYG_dib4fJ4VPw.gif)

I hope this tutorial will be beneficial in you getting started with `ng2-smart-tables`. You can find the complete code for this tutorial at [**this Github repo**](https://github.com/amandeepmittal/ng2-smart-table-example)**.**

> [Originally published at Zeolearn.com](https://www.zeolearn.com/magazine/smart-tables-integration-and-usage-with-angular-6)
