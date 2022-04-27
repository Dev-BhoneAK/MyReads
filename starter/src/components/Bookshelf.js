import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
/**
 * @description Represents a bookshelf component
 * @constructor
 * @param {string} bookshelfTitle - Title of bookshelf which displays as heading
 * @param {function} changeBookshelf - function which updates state of booksOnBookshelf in App.js
 * @param {array} books - list of books which is standing on particular shelf
 * @param {object} booksOnBookshelf - state object that contains all the books those are standing on bookshelves
 */
const Bookshelf = ({bookshelfTitle, changeBookshelf, books, booksOnBookshelf}) => {

        const shelfTitle = {
            'moveTo': 'Move to...',
            'currentlyReading': 'Currently Reading',
            'wantToRead': 'Want to Read',
            'read': 'Read',
            'none': 'None'
        };

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{bookshelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.length > 0 && books.map(book => {
                            const currentShelf = Object.keys(booksOnBookshelf)
                                        .find(key => booksOnBookshelf[key]
                                        .findIndex(bsBooks => bsBooks.id === book.id) !== -1);
                            return (
                                <React.Fragment key={book.id}>
                                    <Book
                                        book={book}
                                        changeBookshelf={changeBookshelf}
                                        currentShelf={currentShelf}
                                        shelfTitle={shelfTitle}
                                    />
                                </React.Fragment>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
}

Bookshelf.propTypes = {
    bookshelfTitle: PropTypes.string.isRequired,
    changeBookshelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    booksOnBookshelf: PropTypes.object.isRequired,
}
export default Bookshelf;