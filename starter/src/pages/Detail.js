import React, {useState, useEffect} from 'react';
import {Link, useParams, useLocation} from "react-router-dom";
import {get} from "../BooksAPI";
import '../css/Detail.css';

const Detail = () => {
    const params = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const location = useLocation();
    useEffect(async () => {
        const book = await get(params.bookId);
        setBookDetail(book);
    }, []);

    return (
        <div className="detail-book">
            <div className="detail-book-bar">
                <Link to={location.state.from.pathname}
                      className="back-to-button">
                    Close
                </Link>
                <div className="detail-book-text-wrapper">
                    <h1>{bookDetail.title}</h1>
                </div>
            </div>

            <div className="detail-container">
                <div className="detail-top">
                    <div
                        className="book-detail-cover"
                        style={{
                            width: 200,
                            height: 280,
                            backgroundImage: `url(${bookDetail.imageLinks && bookDetail.imageLinks.thumbnail})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                    ></div>
                    <div>
                        <h2 className="book-detail-title">Book Details</h2>
                        <p className="book-info">
                            <span className="info-title">Author: </span>
                            {bookDetail.authors && bookDetail.authors[0]}
                        </p>
                        <p className="book-info">
                            <span className="info-title">Category: </span>
                            {bookDetail.categories && bookDetail.categories[0]}
                        </p>
                        <p className="book-info">
                            <span className="info-title">Page Count: </span>
                            {bookDetail.pageCount}
                        </p>
                        <p className="book-info">
                            <span className="info-title">Publisher: </span>
                            {bookDetail.publisher}
                        </p>
                        <p className="book-info">
                            <span className="info-title">Published Date: </span>
                            {bookDetail.publishedDate}
                        </p>
                        <a href={bookDetail.previewLink} className="btn-preview" target="_blank">Book Preview</a>
                    </div>
                </div>
                <div className="detail-bottom">
                    <h2>Description</h2>
                    <p className="description">{bookDetail.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Detail;