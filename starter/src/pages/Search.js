import React from 'react';
import {useState, useEffect} from "react";
import {search} from "../BooksAPI";
import Book from "../components/Book";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
/**
 * @description Represents Search Page
 * @constructor
 * @param {object} booksOnBookshelf - state object that contains all the books those are standing on bookshelves
 * @param {function} changeBookshelf - function which updates state of booksOnBookshelf in App.js
 */
const Search = ({booksOnBookshelf, changeBookshelf}) => {

    const [inputValue, setInputValue] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);
    const shelfTitle = {
        'currentlyReading': 'Currently Reading',
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'none': 'None'
    };

    useEffect(() => {
        const searchQuery = async () => {
            if(inputValue !== ''){
                const searchResult = await search(inputValue, 10);
                if(searchResult.length > 0){
                    setSearchBooks(searchResult);
                }
            }else{
                setSearchBooks([]);
            }
        }
        searchQuery();
    },[inputValue]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/"
                      className="close-search">
                        Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchBooks.length > 0 && searchBooks.map(book => {

                        const currentShelf = Object.keys(booksOnBookshelf)
                                    .find(key => booksOnBookshelf[key] && booksOnBookshelf[key]
                                    .findIndex(bsBooks => bsBooks.id === book.id) !== -1);
                        return (
                            <React.Fragment key={book.id}>
                                <Book
                                    book={book}
                                    changeBookshelf={changeBookshelf}
                                    currentShelf={currentShelf}
                                    shelfTitle={currentShelf ? Object.assign({ moveTo: "Move to..." }, shelfTitle):Object.assign({ addTo: "Add to..." }, shelfTitle)}
                                />
                            </React.Fragment>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}

Search.propTypes = {
    booksOnBookshelf: PropTypes.object.isRequired,
    changeBookshelf: PropTypes.func.isRequired,
}
export default Search;