import React from 'react';
import Book from './Book';

const Bookshelf = ({bookshelfTitle, changeBookshelf, books}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book book={book} changeBookshelf={changeBookshelf} key={book.id}/>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default Bookshelf;