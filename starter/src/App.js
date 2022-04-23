import "./App.css";
import {useEffect, useState} from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import {Route, Routes} from "react-router-dom";
import {getAll} from "./BooksAPI";


function App() {

    return (
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/search" element={<Search/>}/>
      </Routes>
  )
}
export default App;
