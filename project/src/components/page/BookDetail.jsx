import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import booksData from "../../js/data/book_data.json";
import { getCategory } from "../../js/function/sort-books";
import "../../css/page/book-view.scss";
import BookComment from "../module/BookComment";

function BookDetail() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.ISBN === isbn);
  const [loanStatus, setLoanStatus] = useState("대출 가능");
  const [stock, setStock] = useState(0);
  const [returnDate, setReturnDate] = useState(null);

  useEffect(() => {
    if (book) {
      setStock(book.stock);
    }
  }, [book]);

  if (!book) {
    return <div className="error">해당 도서를 찾을 수 없습니다.</div>;
  }

  // 대출
  const handleLoan = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    if (user.bData.length >= 5) {
      alert("최대 5권까지 대출 가능합니다.");
      return;
    }

    if (window.confirm("이 책을 대출하시겠습니까?")) {
      user.bData.push({ isbn: book.ISBN, returnDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0] });
      localStorage.setItem("member_data", JSON.stringify(members));
      setStock(stock - 1);
      setLoanStatus("대출 중");
      setReturnDate(user.bData.find(b => b.isbn === book.ISBN).returnDate);
    }
  };

  // 반납
  const handleReturn = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) return;

    if (window.confirm("정말 반납하시겠습니까?")) {
      user.bData = user.bData.filter(b => b.isbn !== book.ISBN);
      localStorage.setItem("member_data", JSON.stringify(members));
      setStock(stock + 1);
      setLoanStatus("대출 가능");
      setReturnDate(null);
    }
  };

  // 마음에 들어요
  const handleFavorite = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    user.iLoveIt = user.iLoveIt ? [...user.iLoveIt, book.ISBN] : [book.ISBN];
    localStorage.setItem("member_data", JSON.stringify(members));
    alert("찜한 도서에 추가되었습니다.");
  };

  // 도서예약
  const handleReserve = () => {
    alert("도서 재입고 시 문자로 안내해드립니다.");
  };

  return (
    <>
      {/* contents s */}
      <div className="contents">
        {/* book-view-wrap s */}
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
                {returnDate && <li><em>반납 기한</em><span className="return-date">{returnDate}</span></li>}
              </ul>
              <p className="book-text">{book.info || "책 설명이 없습니다."}</p>
              <div className="util-box">
                <div className="btn-wrap">
                  {loanStatus === "대출 가능" ? (
                    <button type="button" className="btn-state loan" onClick={handleLoan}>
                      대출하기
                    </button>
                  ) : (
                    <>
                      <button type="button" className="btn-state ing">대출 중</button>
                      <button type="button" className="btn-state return" onClick={handleReturn}>
                        반납하기
                      </button>
                    </>
                  )}
                </div>
                <button type="button" className="interest" onClick={handleFavorite}>♡</button>
              </div>
            </div>
          </div>
        </div>
        {/* book-view-wrap e */}
        <BookComment />
      </div>
      {/* contents e */}
    </>
    
  );
}

export default BookDetail;
