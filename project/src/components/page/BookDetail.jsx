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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (book) {
      setStock(book.stock);
    }

    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);
    if (user && Array.isArray(user.iLoveIt)) {
      setIsFavorite(user.iLoveIt.includes(book.ISBN));
    }
  }, [book]);

  if (!book) {
    return <div className="error">해당 도서를 찾을 수 없습니다.</div>;
  }

  const handleLoan = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    if (!user.currentData) {
      user.currentData = [];
    }

    if (user.currentData.length >= 5) {
      alert("최대 5권까지 대출 가능합니다.");
      return;
    }

    if (window.confirm("이 책을 대출하시겠습니까?")) {
      user.currentData.push({ isbn: book.ISBN, returnDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split("T")[0] });
      localStorage.setItem("member_data", JSON.stringify(members));
      setStock(stock - 1);
      setLoanStatus("대출 중");
      setReturnDate(user.currentData.find(b => b.isbn === book.ISBN).returnDate);
    }
  };

  const handleReturn = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) return;

    if (!user.bData) {
      user.bData = [];
    }

    if (window.confirm("정말 반납하시겠습니까?")) {
      user.currentData = user.currentData.filter(b => b.isbn !== book.ISBN);
      user.bData.push(book.ISBN);
      localStorage.setItem("member_data", JSON.stringify(members));
      setStock(stock + 1);
      setLoanStatus("대출 가능");
      setReturnDate(null);
    }
  };

  const handleFavorite = () => {
    const members = JSON.parse(localStorage.getItem("member_data")) || [];
    const user = members.find((m) => m.id === JSON.parse(sessionStorage.getItem("loggedInUser"))?.id);

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    if (!Array.isArray(user.iLoveIt)) {
      user.iLoveIt = [];
    }

    if (user.iLoveIt.includes(book.ISBN)) {
      user.iLoveIt = user.iLoveIt.filter(isbn => isbn !== book.ISBN);
      setIsFavorite(false);
      alert("찜한 도서에서 제거되었습니다.");
    } else {
      user.iLoveIt.push(book.ISBN);
      setIsFavorite(true);
      alert("찜한 도서에 추가되었습니다.");
    }

    localStorage.setItem("member_data", JSON.stringify(members));
  };

  return (
    <>
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
                <button type="button" className="interest" onClick={handleFavorite}>
                  {isFavorite ? "❤️" : "♡"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <BookComment />
      </div>
    </>
  );
}

export default BookDetail;
