---
title: 'How to use HarperDB instance with React Hooks'
date: '2020-10-07'
slug: 'harperdb-with-react-hooks'
thumbnail: '/thumbnails/harperdb.png'
tag: 'harperdb'
canonicalUrl: 'https://amanhimself.dev/blog/harperdb-with-react-hooks'
---

![cover](https://i.imgur.com/jN0o3ij.png)

[HarperDB Cloud](https://harperdb.io/developers/get-started/?utm_source=amanmittal) is a database service that supports both SQL and NoSQL queries for CRUD operations. It needs minimal configuration to get started and its realm is not only limited to build REST APIs with a server-side technology such as Node.js.

HarperDB offers a way to access the database cloud instance directly in your client-side application. It has a built-in HTTP API that allows us to query data directly.

In this post, let's take a look at how we configure a HarperDB Cloud database instance and fetch the data by querying the database within a Reactjs app. HarperDB provides a React Hook, known as [useHarperDB](https://github.com/HarperDB/harperdb-sdk-react) to make our jobs easier.

## HarperDB instance glossary

This post is going to use a similar instance of the HarperDB database that we built using the REST API approach with Node.js in our [previous post](https://amanhimself.dev/blog/build-rest-api-with-nodejs-harperdb). Please take a look at the post on how to set up the cloud instance [here](https://amanhimself.dev/blog/build-rest-api-with-nodejs-harperdb#setting-up-an-instance-of-harperdb-cloud). This way you will have a populated table of data fields.

The schema in the above database instance is called `dev`. A schema in HarperDB is necessary. It is equivalent to a collection of tables. Without an existing schema you cannot create a new table and without a table, you cannot add or update data in the HarperDB instance.

Below the schema, there is an option to add one or more tables. In the above instance, there is a table already created and is called `outlets`. This table has a unique identifier `id` for each row of data.

On the right-hand side, you will find the data inside the table. Do notice the two timestamp fields. They are auto inserted by HarperDB whenever a new row adds to the table and is auto-maintained.

- **createdtime**: to record the timestamp when data is inserted.
- **updatedtime**: to record the timestamp when any data field is updated for the last time.

![ss0](https://i.imgur.com/iqb3tFI.png)

Once you have set up the cloud instance, make sure to use a React project with the library's version `16.8.0+`.

## Getting started

Start by creating a new React app. We are going to use this React app for building the example app in this post. Open up a terminal window and execute the following command:

```shell
npx create-react-app harperdb-integration-react

# after the project directory has been created
cd harperdb-integration-react

# install the following dependency
yarn add use-harperdb@0.1.2
```

Now you can start the development server to see the React app in action. Go to the terminal window and execute the command `yarn start`. You are going to get the following output in a browser window at URL: `http://localhost:3000/`.

![ss1](https://i.imgur.com/VTDySVc.png)

## Creating a user with custom roles

By default, the user created in the HarperDB Cloud instance is a superuser. It has admin rights to query and add data and rights to create and drop the table from the existing schema as well as create and drop new schemas. In a client-side application, we do not want to have a superuser. Since most client apps are public, this is never a good approach to use the default user.

The approach to resolve this is to create a new user that has the rights to only perform CRUD operations inside a data table. HarperDB provides a way to define custom user roles as well as create a new user using that role.

Start by opening your cloud instance and go to the tab `roles` [from the menu bar](https://harperdbhelp.zendesk.com/hc/en-us/articles/360051486534-Managing-Role-Permissions).

![ss2](https://i.imgur.com/tnoRgYP.png)

Here you can define a new **standard role** to create a custom one. Let's this new role, `client_user`.

![ss3](https://i.imgur.com/VFtacjy.png)

Once the new role is created, the instance prompts with the permissions we can assign to any user with this role. You are now allowed to configure the access to tables and schemas for this specific role. There is only one schema right now and inside it, there is only one data table. For this example, let's keep the default configuration and proceed by pressing the button **Update Role Permissions**.

![ss4](https://i.imgur.com/L5XyeIP.png)

Once the permissions are updated, go to the tab `users` next to the `roles` in the menu bar. This is used to add a new user with the custom role just created. From the drop-down menu, select the role `client_user`.

![ss5](https://i.imgur.com/D3sXeLD.png)

Click the **Add user** button to add the new user.

![ss6](https://i.imgur.com/nvVVhq6.png)

Now, we can use this custom user in the client React app to query the data from the table `outlets`.

## Integrating HarperDB in a React

The `use-harperdb` hook comes with a `HarperDBProvider` that is used to wrap the instance of the React app or the `App` component in general inside the `index.js` file. This is mandatory to execute a CRUD operation on the database instance.

Add the following import statement inside `src/index.js` file:

```js
// ... other import statements
import { HarperDBProvider } from 'use-harperdb';
```

To execute any CRUD operation on the database instance, the provider requires the db instance URL, the username, and the password associated with that user. We are going to make use of environmental variables to add these values.

Create a new file called `.env` at the root of the React project with the following variables. The values of these variables are mentioned as a description in `[]` but you must replace the square brackets and your own values.

```shell
REACT_APP_DB_URL=[Your Cloud Instance Provider URL]
REACT_APP_USER=[The name of the custom user with client_user role]
REACT_APP_PASSWORD=[The password associated with the custom user]
```

Create React App reads any environmental variables that are prefixed with `REACT_APP`. Instead of using a third-party library, we can directly use these environmental variables to provide necessary attributes to `HarperDBProvider`.

```js
ReactDOM.render(
  <React.StrictMode>
    <HarperDBProvider
      url={process.env.REACT_APP_DB_URL}
      user={process.env.REACT_APP_USER}
      password={process.env.REACT_APP_PASSWORD}
    >
      <App />
    </HarperDBProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

That's it. We have successfully configured the React app to use the HarperDB database instance.

## Querying the data from HarperDB

To query the data from the database instance in the React app, the `useHarperDB` hook provides elements to do so.

Open the `App.js` file and import the hook from `use-harperdb`. Let's also set up a basic UI to display data when fetched.

```js
import React from 'react';
import './App.css';
import { useHarperDB } from 'use-harperdb';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Starbucks Outlets</h2>
        <table>
          <thead style={{ marginBottom: '20px' }}>
            <tr>
              <td style={{ textTransform: 'uppercase' }}>City</td>
              <td style={{ textTransform: 'uppercase' }}>Name</td>
              <td style={{ textTransform: 'uppercase' }}>Latitude</td>
              <td style={{ textTransform: 'uppercase' }}>Longitude</td>
            </tr>
          </thead>
          <tbody>
            <tr>{/* TODO: display data from query */}</tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
```

The rule for using any hook is that they can only be consumed inside a functional component. The `useHarperDB` hook gives an array with elements to query the `data` which is returned as an array. It also provides:

- `loading` where you can let the user know if the query is running the data is not yet loaded
- `error` determines if there is an error when querying the data
- `refresh` it is a function that allows fetching the data

To query the data from the database instance, pass the object inside the hook.

Add the following snippet query in the `App.js` file to fetch all the data from the database.

```js
function App() {
  const [data, loading, error, refresh] = useHarperDB({
    query: { operation: 'sql', sql: 'select * from dev.outlets' }
    // interval: 5000
  });

  //...
}
```

In the above snippet, the second property of `interval` passed is optional to use when you don't want to explicitly use the `refresh` function. It accepts a value in milliseconds.

Let's add some JSX for `loading` and `error` by using `if/else` syntax inside the `App` component.

```js
function App() {
  // ...

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (error && data.length === 0) {
    return <div>Error, no data found</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Starbucks Outlets</h2>
        <table>
          <thead style={{ marginBottom: '20px' }}>
            <tr>
              <td style={{ textTransform: 'uppercase' }}>City</td>
              <td style={{ textTransform: 'uppercase' }}>Name</td>
              <td style={{ textTransform: 'uppercase' }}>Latitude</td>
              <td style={{ textTransform: 'uppercase' }}>Longitude</td>
            </tr>
          </thead>
          <tbody>
            <tr>{/* TODO: display data from query */}</tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}
```

For a very brief moment, you may see the loading message being displayed.

![ss7](https://i.imgur.com/D5YDC1J.gif)

Also, if you are passing `interval` as the second property, you may notice that after every 5 seconds, the React app automatically refreshes the web page. To stop this behavior, you can remove the `interval` property.

Now using the JavaScript's `map` function, let's map over the array of `data` and display the contents. If data is fetched that means it exists and we can easily map over the array. Add the following code snippet in place of the comment.

```js
<tbody>
  {data &&
    data.map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{item.author}</td>
      </tr>
    ))}
</tbody>
```

Go back to the browser window and you will get the following result:

![ss8](https://i.imgur.com/jJFQ9k3.png)

The query can also be made using the `useHarperdb` hook with only the `data` array. Add the following query to fetch the total number of outlets or records from the database.

```js
const [data2] = useHarperDB({
  query: {
    operation: 'sql',
    sql: 'select count(*) as totalOutlets from dev.outlets'
  }
});
```

To display the total count, add the modify the JSX rendered from `App` component:

```js
// ...
<h2>Starbucks Outlets</h2>
<p>Total Outlets: {data2 && data2[0].totalOutlets}</p>
// ...
```

Here is the output after this step:

![ss9](https://i.imgur.com/jUY8J3T.png)

## Conclusion

Hooks are a great addition in the React world and they certainly help us write less code. The objective of this post was to introduce you to the `useHarperDB` hook and how to integrate it into a React app to fetch the data from a database hosted in the cloud.

**Resources & Further Reading:**

- [HarperDB documentation](https://harperdb.io/developers/documentation/overview/?utm_source=amanmittal)
- [HarperDB Developer examples](https://harperdb.io/developers/developer-examples/?utm_source=amanmittal) includes tutorials on React, Websocket, Python, etc.
