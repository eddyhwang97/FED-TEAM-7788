//  Search 컴포넌트 - Search.jsx
import { useEffect, useState } from "react";
import booksData from "../../js/data/book_data.json";
import "../../css/page/book-list.scss";
import { getCategory, sortByNewest, sortByBest } from "../../js/function/sort-books";
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

function Search({ gnb1, gnb2 }) {
  const booksList = booksData;
  const searchOption = ["도서명", "저자명", "ISBN", "출판사", "장르"];
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        {/* 도서 리스트 */}
        <SearchBox searchOption={searchOption} />
        <div className="book-list-wrap">
          <ul className="book-list">
            {booksList.map((book) => (
              <li key={book.ISBN}>
                <a href="#" className="item">
                  <div className="img-box">
                    <img src={`../img/book/img-${book.ISBN}.jpg`} alt={book.title} />
                  </div>
                  <div className="text-box">
                    <div className="book-tit">
                      <p>{book.title}</p>
                      <span className="label">{getCategory(book.ISBN)}</span>
                    </div>
                    <ul className="book-info">
                      <li>
                        <em>저자</em>
                        <span className="writer">{book.author}</span>
                      </li>
                      <li>
                        <em>출판사</em>
                        <span className="publisher">{book.publisher}</span>
                      </li>
                    </ul>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Search;
