import React from 'react';
import { Link } from "react-router-dom";
import { getAll } from "../BooksAPI";
import { useState, useEffect } from "react";
import Bookshelf from "../components/Bookshelf";

const Home = ({booksOnBookshelf, changeBookshelf}) => {

  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf bookshelfTitle="Currently Reading" books={booksOnBookshelf.currentlyReading} changeBookshelf={changeBookshelf}/>
              <Bookshelf bookshelfTitle="Want to Read" books={booksOnBookshelf.wantToRead} changeBookshelf={changeBookshelf}/>
              <Bookshelf bookshelfTitle="Read" books={booksOnBookshelf.read} changeBookshelf={changeBookshelf}/>
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

export default Home;