import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import booksData from "../../js/data/book_data.json";
import { getCategory } from "../../js/function/sort-books";
import "../../css/page/book-view.scss";

function BookDetail() {
  const { isbn } = useParams();
  const book = booksData.find((b) => b.ISBN === isbn);
  const [loanStatus, setLoanStatus] = useState("대출 가능");
  const [reserved, setReserved] = useState(false);
  const [loanDate, setLoanDate] = useState(null);
  const maxLoanLimit = 5;

  useEffect(() => {
    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};
    const reservedBooks = JSON.parse(localStorage.getItem("reservedBooks")) || {};

    if (loanedBooks[isbn]) {
      setLoanStatus("대출 중");
      setLoanDate(new Date(loanedBooks[isbn]));
    }
    if (reservedBooks[isbn]) {
      setReserved(true);
    }

    // 대출 기간 확인 (7일 초과 시 자동 반납)
    if (loanedBooks[isbn]) {
      const loanTime = new Date(loanedBooks[isbn]);
      const now = new Date();
      const diffDays = Math.floor((now - loanTime) / (1000 * 60 * 60 * 24));

      if (diffDays >= 7) {
        handleReturn();
      }
    }
  }, [isbn]);

  const handleLoan = () => {
    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};

    // 현재 대출된 책 개수 확인
    if (Object.keys(loanedBooks).length >= maxLoanLimit) {
      alert("최대 5권까지 대출할 수 있습니다.");
      return;
    }

    if (!loanedBooks[isbn]) {
      const loanTime = new Date().toISOString();
      loanedBooks[isbn] = loanTime;
      localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));
      setLoanStatus("대출 중");
      setLoanDate(new Date(loanTime));
    }
  };

  const handleReturn = () => {
    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};
    delete loanedBooks[isbn];
    localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));
    setLoanStatus("대출 가능");
    setLoanDate(null);

    const reservedBooks = JSON.parse(localStorage.getItem("reservedBooks")) || {};
    if (reservedBooks[isbn]) {
      delete reservedBooks[isbn];
      localStorage.setItem("reservedBooks", JSON.stringify(reservedBooks));
      setReserved(false);
    }
  };

  const handleReserve = () => {
    const reservedBooks = JSON.parse(localStorage.getItem("reservedBooks")) || {};
    reservedBooks[isbn] = true;
    localStorage.setItem("reservedBooks", JSON.stringify(reservedBooks));
    setReserved(true);
  };

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
                {loanStatus === "대출 가능" ? (
                  <button type="button" className="btn-state loan" onClick={handleLoan}>
                    대출하기
                  </button>
                ) : (
                  <button type="button" className="btn-state ing" onClick={handleReturn}>
                    대출 중 (반납하기)
                  </button>
                )}
                {loanStatus === "대출 중" && !reserved && (
                  <button type="button" className="btn-state reserve" onClick={handleReserve}>
                    예약하기
                  </button>
                )}
                {reserved && <p className="reserved-text">예약 완료</p>}
              </div>
              <button type="button" className="interest">♡</button>
            </div>
            {loanDate && (
                <p className="loan-date">반납 기한: {new Date(loanDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
