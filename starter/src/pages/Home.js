import React from 'react';
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import { useState, useEffect } from "react";
import Bookshelf from "../components/Bookshelf";
import PropTypes from "prop-types";
import {Routes, Redirect} from 'react-router-dom';
/**
 * @description Represents Home Page
 * @constructor
 * @param {object} booksOnBookshelf - state object that contains all the books those are standing on bookshelves
 */
const Home = ({booksOnBookshelf, logout}) => {

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <div></div>
            <h1>MyReads</h1>
            <a onClick={logout}>Logout</a>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf bookshelfTitle="Currently Reading" books={booksOnBookshelf.currentlyReading} booksOnBookshelf={booksOnBookshelf}/>
              <Bookshelf bookshelfTitle="Want to Read" books={booksOnBookshelf.wantToRead} booksOnBookshelf={booksOnBookshelf}/>
              <Bookshelf bookshelfTitle="Read" books={booksOnBookshelf.read} booksOnBookshelf={booksOnBookshelf}/>
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
}
export default Home;