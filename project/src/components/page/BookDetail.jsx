import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import booksData from "../../js/data/book_data.json";
import { getCategory } from "../../js/function/sort-books";
import "../../css/page/book-view.scss";
import BookComment from "../module/BookComment";

function BookDetail() {
  const { isbn } = useParams();
  const book = booksData.find((b) => b.ISBN === isbn);
  const [loanStatus, setLoanStatus] = useState("대출 가능");
  const [reserved, setReserved] = useState(false);
  const [loanDate, setLoanDate] = useState(null);
  const [stock, setStock] = useState(0);
  const [showLoanPopup, setShowLoanPopup] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const maxLoanLimit = 5;

  useEffect(() => {
    if (book) {
      setStock(book.stock);
    }

    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};
    const reservedBooks = JSON.parse(localStorage.getItem("reservedBooks")) || {};

    if (loanedBooks[isbn]) {
      setLoanStatus("대출 중");
      setLoanDate(new Date(loanedBooks[isbn]));
    }
    if (reservedBooks[isbn]) {
      setReserved(true);
    }
  }, [isbn, book]);

  const confirmLoan = () => {
    if (stock === 0) {
      alert("대출이 불가능합니다.");
      return;
    }
    setShowLoanPopup(true);
  };

  const handleLoan = () => {
    const currentUser = sessionStorage.getItem("loggedInUser");
    if (!currentUser) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};
    if (Object.keys(loanedBooks).length >= maxLoanLimit) {
      alert("최대 5권까지 대출할 수 있습니다.");
      return;
    }

    if (!loanedBooks[isbn] && stock > 0) {
      const loanTime = new Date().toISOString();
      loanedBooks[isbn] = loanTime;
      localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));
      setLoanStatus("대출 중");
      setLoanDate(new Date(loanTime));
      setStock(stock - 1);
    }
    setShowLoanPopup(false);
  };

  const confirmReturn = () => {
    setShowReturnPopup(true);
  };

  const handleReturn = () => {
    const loanedBooks = JSON.parse(localStorage.getItem("loanedBooks")) || {};
    delete loanedBooks[isbn];
    localStorage.setItem("loanedBooks", JSON.stringify(loanedBooks));
    setLoanStatus("대출 가능");
    setLoanDate(null);
    setStock(stock + 1);
    setShowReturnPopup(false);
  };

  const handleReserve = () => {
    const reservedBooks = JSON.parse(localStorage.getItem("reservedBooks")) || {};
    reservedBooks[isbn] = true;
    localStorage.setItem("reservedBooks", JSON.stringify(reservedBooks));
    setReserved(true);
    alert("예약되었습니다.");
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
              <li><em>페이지</em><span className="page">{book.pNum}</span></li>
              <li><em>카테고리</em><span className="genre">{getCategory(book.ISBN)}</span></li>
              <li><em>재고</em><span className="stock">{stock}권</span></li>
            </ul>
            <p className="book-text">{book.info || "책 설명이 없습니다."}</p>
            <div className="util-box">
              <div className="btn-wrap">
                {stock > 0 ? (
                  loanStatus === "대출 가능" ? (
                    <button type="button" className="btn-state loan" onClick={confirmLoan}>
                      대출하기
                    </button>
                  ) : (
                    <>
                      <button type="button" className="btn-state ing">대출 중</button>
                      <button type="button" className="btn-state return" onClick={confirmReturn}>
                        반납하기
                      </button>
                    </>
                  )
                ) : (
                  <button type="button" className="btn-state reserve" onClick={handleReserve}>
                    예약하기
                  </button>
                )}
              </div>
              <button type="button" className="interest">♡</button>
            </div>
          </div>
        </div>
      </div>
      {showLoanPopup && (
        <div className="popup-wrap on">
          <div className="alert-popup">
            <p className="ment">이 책을 대출하시겠습니까?</p>
            <div className="popup-btn">
              <button onClick={handleLoan}>확인</button>
              <button onClick={() => setShowLoanPopup(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
      {showReturnPopup && (
        <div className="popup-wrap on">
          <div className="alert-popup">
            <p className="ment">이 책을 반납하시겠습니까?</p>
            <div className="popup-btn">
              <button onClick={handleReturn}>확인</button>
              <button onClick={() => setShowReturnPopup(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
      <BookComment />
    </div>
  );
}

export default BookDetail;
