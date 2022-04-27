import "./App.css";
import {useEffect, useState} from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import {Route, Routes} from "react-router-dom";
import {getAll} from "./BooksAPI";

function App() {

    const [booksOnBookshelf, setBooksOnBookshelf] = useState({
        'currentlyReading' : [],
        'wantToRead' : [],
        'read' : []
    });

    useEffect(async () => {
        const books = await getAll();
        setBooksOnBookshelf({
            'currentlyReading': books.filter(book => book.shelf === "currentlyReading"),
            'wantToRead': books.filter(book => book.shelf === "wantToRead"),
            'read': books.filter(book => book.shelf === "read")
        });
    }, []);

    /**
     * @description set state of booksOnBookshelf from movedBook's currentShelf to moveToBookshelf
     * @function
     * @param {object} movedBook - Moved Book Object which contains all information of book
     * @param {string} moveToBookshelf - dynamic bookshelf title which book was moved to
     * @param {string} currentShelf - dynamic bookshelf title which book was moved from
     */
    const changeBookshelf = (movedBook, moveToBookshelf, currentShelf) => {
        const currentBookShelf = movedBook.shelf ? movedBook.shelf : currentShelf;
        setBooksOnBookshelf({
            ...booksOnBookshelf,
            [moveToBookshelf]: moveToBookshelf !== 'none' && booksOnBookshelf[moveToBookshelf].concat(movedBook),
            [currentBookShelf]: currentBookShelf && booksOnBookshelf[currentBookShelf].filter(book => book.id != movedBook.id)
        })
    }

    return (
        <Routes>
          <Route exact path="/" element={<Home booksOnBookshelf={booksOnBookshelf} changeBookshelf={changeBookshelf}/>}/>
          <Route path="/search" element={<Search booksOnBookshelf={booksOnBookshelf} changeBookshelf={changeBookshelf}/>} />
      </Routes>
  )
}
export default App;
