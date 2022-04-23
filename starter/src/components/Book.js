import React from 'react';
import {useState} from "react";
import {update} from "../BooksAPI";

const Book = ({book, changeBookshelf}) => {

    const shelfTitle = {
        'moveTo': 'Move to...',
        'currentlyReading': 'Currently Reading',
        'wantToRead': 'Want to Read',
        'read': 'Read',
        'none': 'None'
    };

    const updateBookshelf = (event, book) => {

        const moveToBookshelf = event.target.value;
        update(book, moveToBookshelf);
        changeBookshelf(book, moveToBookshelf);
    }

    return (
        <>
            <li>
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                                width: 128,
                                height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}
                        ></div>
                        <div className="book-shelf-changer">
                            <select onChange={(event) => updateBookshelf(event, book)} defaultValue={book.shelf}>
                                {Object.keys(shelfTitle).map((key, index) => (
                                    <option value={key} disabled={index === 0 && true} key={index}>
                                        {shelfTitle[key]}
                                    </option>
                                ))}
                                {/*<option value="none" disabled>*/}
                                {/*    Move to...*/}
                                {/*</option>*/}
                                {/*<option value="currentlyReading">*/}
                                {/*    Currently Reading*/}
                                {/*</option>*/}
                                {/*<option value="wantToRead">Want to Read</option>*/}
                                {/*<option value="read" selected="true">Read</option>*/}
                                {/*<option value="none">None</option>*/}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors[0]}</div>
                </div>
            </li>
        </>
    );
}

export default Book;