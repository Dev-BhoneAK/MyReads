# MyReads Project

This is the assignment project from Udacity which is a bookshelf app that allows user to select and categorize books into 3 different categories and can search for more books through API.
It also contains User Authentication and detail info of book as an extra.

## Setup

To get started developing right away:

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Project directory structure

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components # All of react components are in this directory.
    │   ├── Book.js # Book component which is used in both home and search pages.
    │   ├── Bookshelf.js # Bookshelf component classifies into 3 categories(Currently Reading, Want to read and Read), uses in home page.
    ├── contexts # Contains React contexts
    │   ├── ChangeBookShelf.svg # React context which will be used in root of app to pass through the lowest child component
    ├── css # All of stylesheets are in this directory.
    │   ├── Detail.css # Stylesheet for Book Detail page
    │   ├── Login.css # Stylesheet for Login page
    │   ├── NotFound.css # Stylesheet for 404 page
    ├── icons # Helpful icons for app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    │   └── correct-tick.svg
    ├── images # Helpful images for app.
    │   ├── 404.jpg
    ├── pages # Contains all pages which are navigated by Routes
    │   ├── Admin.js # Page which contains nested route to login and signup pages,
    │   ├── Detail.js # Page which shows detail info about book and description, This page can be accessed by clicking book thumbnail on home or search pages.
    │   ├── Home.js # Page which shows 3 different bookshelves. This page will be rendered after successful login.
    │   ├── Login.js # Page which shows login form to authenticate. Before Login, user should signup first.
    │   ├── NotFound.js # Page which shows 400 error page when user navigates to the route that won't served in app.
    │   ├── Search.js # Page which contains user searchable input and result panel which displays the books as total result according to user query.
    │   ├── Signup.js # Page which shows signup form to register user into google firebase.And then, User can be log in with these singup data into app.
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of app. Contains static HTML right now.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── firebase.js # Contains signup and login functions which are connected to firebase
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.
    └── ProtectedRoute.js # Parent Component which willl be used to protect child components which are needed authorization
```

## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query);
```

- query: `<String>`
- Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms. That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/README.md).
