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
        console.log(books);
        setBooksOnBookshelf({
            'currentlyReading': books.filter(book => book.shelf === "currentlyReading"),
            'wantToRead': books.filter(book => book.shelf === "wantToRead"),
            'read': books.filter(book => book.shelf === "read")
        });
    }, []);

    const changeBookshelf = (currentBook, moveToBookshelf) => {

        setBooksOnBookshelf({
            ...booksOnBookshelf,
            [currentBook.shelf]: booksOnBookshelf[currentBook.shelf].filter(book => book.id != currentBook.id),
            [moveToBookshelf]: moveToBookshelf !== 'none' && booksOnBookshelf[moveToBookshelf].concat(currentBook)
        })
    }

    return (
        <Routes>
          <Route exact path="/" element={<Home booksOnBookshelf={booksOnBookshelf} changeBookshelf={changeBookshelf}/>}/>
          <Route path="/search" element={<Search/>}/>
      </Routes>
  )
}
export default App;
