import "./App.css";
import React, {useEffect, useState} from "react";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import {Route, Routes, useNavigate} from "react-router-dom";
import {getAll} from "./BooksAPI";
import ProtectedRoute from "./ProtectedRoute";
import {ChangeBookShelf} from "./contexts/ChangeBookShelf";

function App() {

    const [booksOnBookshelf, setBooksOnBookshelf] = useState({
        'currentlyReading' : [],
        'wantToRead' : [],
        'read' : []
    });
    const navigate = useNavigate();

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

    const logout = () => {
        sessionStorage.removeItem('user-token');
        navigate('/');
    }

    return (
        <Routes>
            <Route exact path="/" element={<Admin />} >
                <Route index element={<Login />} />
                <Route path="login" element={<Login />} ></Route>
                <Route path="signup" element={<Signup />} ></Route>
            </Route>

                <Route path="/home" element={
                    <ProtectedRoute>
                        <ChangeBookShelf.Provider value={changeBookshelf}>
                            <Home booksOnBookshelf={booksOnBookshelf} logout={logout}/>
                        </ChangeBookShelf.Provider>
                    </ProtectedRoute>
                }/>
                <Route path="/search" element={
                    <ProtectedRoute>
                        <ChangeBookShelf.Provider value={changeBookshelf}>
                            <Search booksOnBookshelf={booksOnBookshelf}/>
                        </ChangeBookShelf.Provider>
                    </ProtectedRoute>
                }/>
                <Route path="/detail/:bookId" element={
                    <ProtectedRoute>
                        <Detail />
                    </ProtectedRoute>
                } />

      </Routes>
  )
}
export default App;
