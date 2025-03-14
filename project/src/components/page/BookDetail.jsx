import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import booksData from "../../js/data/book_data.json";
import { getCategory } from "../../js/function/sort-books";
import "../../css/page/book-view.scss";
import BookComment from "../module/BookComment";
import { GP } from "../module/Contexter";

function BookDetail() {
  const { isbn } = useParams();
  const navigate = useNavigate();
  const book = booksData.find((b) => b.ISBN === isbn);
  const [loanStatus, setLoanStatus] = useState("대출 가능");
  const [stock, setStock] = useState(0);
  const [returnDate, setReturnDate] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const context = useContext(GP);

  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;

  useEffect(() => {
    if (book) {
      setStock(book.stock);
    }

    if (user) {
      if (Array.isArray(user.iLoveIt)) {
        setIsFavorite(user.iLoveIt.includes(book.ISBN));
      }
      if (Array.isArray(user.currentData)) {
        const loanedBook = user.currentData.find((b) => b.isbn === book.ISBN);
        if (loanedBook) {
          setLoanStatus("대출 중");
          setReturnDate(loanedBook.dueDate);
        }
      }
    }
  }, [book]);

  if (!book) {
    return <div className="error">해당 도서를 찾을 수 없습니다.</div>;
  }

  // 도서 대출
  const handleLoan = () => {

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
      const today = new Date();
      const dueDate = new Date(today.setDate(today.getDate() + 7)).toISOString().split("T")[0];
      user.currentData.push({ isbn: book.ISBN, checkoutDate: new Date().toISOString().split("T")[0], dueDate });
      sessionStorage.setItem("loggedInUser", JSON.stringify(user)); 
      setStock(stock - 1);
      setLoanStatus("대출 중");
      setReturnDate(dueDate);
    }
  };

  // 도서 반납
  const handleReturn = () => {

    if (!user) return;

    if (!user.bData) {
      user.bData = [];
    }

    if (window.confirm("정말 반납하시겠습니까?")) {
      user.currentData = user.currentData.filter((b) => b.isbn !== book.ISBN);
      user.bData.push(book.ISBN);
      sessionStorage.setItem("loggedInUser", JSON.stringify(user)); 
      setStock(stock + 1);
      setLoanStatus("대출 가능");
      setReturnDate(null);
    }
  };

  // 도서 찜
  const handleFavorite = () => {

    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      navigate("/login");
      return;
    }

    if (!Array.isArray(user.iLoveIt)) {
      user.iLoveIt = [];
    }

    if (user.iLoveIt.includes(book.ISBN)) {
      user.iLoveIt = user.iLoveIt.filter((isbn) => isbn !== book.ISBN);
      setIsFavorite(false);
      alert("찜한 도서에서 제거되었습니다.");
    } else {
      user.iLoveIt.push(book.ISBN);
      setIsFavorite(true);
      alert("찜한 도서에 추가되었습니다.");
    }

    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
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
              </ul>
              <p className="book-text">{book.info}</p>
              {returnDate && <p><em>반납 기한 </em><span className="return-date">{returnDate}</span></p>}
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
        {/* book-view-wrap e */}
        <BookComment />
      </div>
      {/* contents e */}
    </>
  );
}

export default BookDetail;
