import React from 'react';
import {useState, useEffect} from "react";
import {search} from "../BooksAPI";
import Book from "../components/Book";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from '../icons/correct-tick.png';
/**
 * @description Represents Search Page
 * @constructor
 * @param {object} booksOnBookshelf - state object that contains all the books those are standing on bookshelves
 */
const Search = ({booksOnBookshelf}) => {

    const [inputValue, setInputValue] = useState("");
    const [searchBooks, setSearchBooks] = useState([]);
    const [alertState, setAlertState] = useState(false);
    const navigate = useNavigate();
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
                    sessionStorage.setItem('input-value', inputValue);
                    sessionStorage.setItem('searched-books', JSON.stringify(searchResult));
                    setSearchBooks(searchResult);
                }
            }else{
                setSearchBooks([]);
            }
        }
        searchQuery();
    },[inputValue]);

    useEffect(() => {
        let mounted = true;

        setTimeout(() => {
            mounted && setAlertState(false);
        }, 3000);

        return () => {
            mounted = false;
        }
    }, [alertState]);

    useEffect(() => {
        const inputValue = sessionStorage.getItem('input-value');
        const searchResult = sessionStorage.getItem('searched-books');
        inputValue && setInputValue(inputValue);
        searchResult && setSearchBooks(JSON.parse(searchResult));
    },[]);

    const changeAlertState = () => {

        setAlertState(true);
    }

    const closeSearch = () => {
        sessionStorage.removeItem('input-value');
        sessionStorage.removeItem('searched-books');
        navigate('/home');
    }

    return (
        <div className="search-books">

            <div className="search-books-bar">
                <a className="close-search" onClick={closeSearch}>Close</a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                    />
                </div>
                <a className="close-search" onClick={closeSearch}>Logout</a>
            </div>

            <div className="search-books-results">
                {alertState &&
                    <div className="alert-box">
                        <img src={Logo} alt="correct-tick" width="20"/>
                        <p>Book has been moved. <Link to="/home" className="check-link"><span>Check this out!</span></Link></p>
                    </div>
                }

                <ol className="books-grid">
                    {searchBooks.length > 0 && searchBooks.map(book => {

                        const currentShelf = Object.keys(booksOnBookshelf)
                                    .find(key => booksOnBookshelf[key] && booksOnBookshelf[key]
                                    .findIndex(bsBooks => bsBooks.id === book.id) !== -1);
                        return (
                            <React.Fragment key={book.id}>
                                <Book
                                    book={book}
                                    currentShelf={currentShelf}
                                    shelfTitle={currentShelf ? Object.assign({ moveTo: "Move to..." }, shelfTitle):Object.assign({ addTo: "Add to..." }, shelfTitle)}
                                    changeAlertState={changeAlertState}
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
    booksOnBookshelf: PropTypes.object.isRequired
}
export default Search;