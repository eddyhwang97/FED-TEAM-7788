import { useParams } from "react-router-dom";
import booksData from "../../js/data/book_data.json";

import { getCategory } from "../../js/function/sort-books";
import "../../css/page/book-view.scss";

function BookDetail() {
  const { isbn } = useParams(); // URL에서 ISBN 가져오기
  const book = booksData.find((b) => b.ISBN === isbn); // 해당 책 정보 찾기

  if (!book) {
    return <div className="error">해당 도서를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="contents">
      <div className="book-view-wrap">
        <div className="book-view">
          <div className="img-box">
            <img src={`../img/book/img-${book.ISBN}.jpg`} alt={book.title} />
          </div>
          <div className="info-box">
            <div className="book-tit">
              <p>{book.title}</p>
              <span>{book.subtitle || ""}</span>
            </div>
            <ul className="book-info">
              <li><em>제목</em><span className="title">{book.title}</span></li>
              <li><em>작가</em><span className="author">{book.author}</span></li>
              <li><em>출판사</em><span className="publisher">{book.publisher}</span></li>
              <li><em>ISBN</em><span className="isbn">{book.ISBN}</span></li>
              <li><em>발행일</em><span className="date">{book.pDate}</span></li>
              <li><em>페이지</em><span className="page">{book.pNum}p</span></li>
              <li><em>카테고리</em><span className="genre">{getCategory(book.ISBN)}</span></li>
            </ul>
            <p className="book-text">{book.info || "책 설명이 없습니다."}</p>
            <div className="util-box">
              <div className="btn-wrap">
                <button type="button" className="btn-state loan">대출하기</button>
                <button type="button" className="btn-state reserve">예약하기</button>
              </div>
              <button type="button" className="interest">♡</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
