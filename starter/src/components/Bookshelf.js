import React from 'react';
import Book from './Book';

const Bookshelf = ({bookshelfTitle}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookshelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <Book />
                    <Book />
                </ol>
            </div>
        </div>
    );
}

export default Bookshelf;