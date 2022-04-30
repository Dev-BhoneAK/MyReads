import React, {useEffect, useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {get, update} from "../BooksAPI";
import {ChangeBookShelf} from "../contexts/ChangeBookShelf";
import PropTypes from "prop-types";

/**
 * @description Represents a book component
 * @constructor
 * @param {object} book - Book Object which contains all info about book
 * @param {function} changeBookshelf - function which updates state of booksOnBookshelf in App
 * @param {string} currentShelf - indicates the book is on which shelf
 * @param {object} shelfTitle - list of options that will show inside select box
 * @param {function} changeAlertState - function which updates state of alertState in Search
 */
const Book = ({book, currentShelf, shelfTitle, changeAlertState}) => {

        const changeBookshelf = React.useContext(ChangeBookShelf);
        const location = useLocation();
    /**
     * @description invoke function of updating booksOnBookshelf state and update backend data to get persistant data
     * @function
     * @param {object} event - get value from user's onChange event indicating which shelf user want to move
     * @param {object} book - Moved Book Object which contains all information of book
     */
    const updateBookshelf = (event, book) => {

        const moveToBookshelf = event.target.value;
        update(book, moveToBookshelf);
        changeBookshelf(book, moveToBookshelf, currentShelf);
        changeAlertState && changeAlertState();
    }
return (
        <li>
            <div className="book">
                <div className="book-top">
                    <Link to={`/detail/${book.id}`} state={{from: location}}>
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                            }}
                        ></div>
                    </Link>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => updateBookshelf(event, book)} defaultValue={currentShelf ? currentShelf : 'none'}>
                            {
                                Object.keys(shelfTitle).map((key, index) => (
                                <option value={key} disabled={index === 0 && true} key={index}>
                                    {shelfTitle[key]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors[0]}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    currentShelf: PropTypes.string,
    shelfTitle: PropTypes.object.isRequired,
    changeAlertState: PropTypes.func
}
export default Book;