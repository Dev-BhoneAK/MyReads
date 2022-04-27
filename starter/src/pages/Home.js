import React from 'react';
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import { useState, useEffect } from "react";
import Bookshelf from "../components/Bookshelf";
import PropTypes from "prop-types";
/**
 * @description Represents Home Page
 * @constructor
 * @param {object} booksOnBookshelf - state object that contains all the books those are standing on bookshelves
 * @param {function} changeBookshelf - function which updates state of booksOnBookshelf in App.js
 */
const Home = ({booksOnBookshelf, changeBookshelf}) => {

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf bookshelfTitle="Currently Reading" books={booksOnBookshelf.currentlyReading} changeBookshelf={changeBookshelf} booksOnBookshelf={booksOnBookshelf}/>
              <Bookshelf bookshelfTitle="Want to Read" books={booksOnBookshelf.wantToRead} changeBookshelf={changeBookshelf} booksOnBookshelf={booksOnBookshelf}/>
              <Bookshelf bookshelfTitle="Read" books={booksOnBookshelf.read} changeBookshelf={changeBookshelf} booksOnBookshelf={booksOnBookshelf}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              Add a book
            </Link>
          </div>
        </div>
    </div>
  );

}

Home.propTypes = {
  booksOnBookshelf: PropTypes.object.isRequired,
  changeBookshelf: PropTypes.func.isRequired,
}
export default Home;