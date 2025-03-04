//  Search 컴포넌트 - Search.jsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import booksData from "../../js/data/book_data.json";
import "../../css/page/book-list.scss";
import { getCategory, sortByNewest, sortByBest } from "../../js/function/sort-books";
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

function Search({ gnb1, gnb2 }) {
  const booksList = [...booksData];
  const searchOption = ["도서명", "저자명", "ISBN", "출판사", "장르"];

  // useState
  // 검색 상태변수
  const [selectOption, setSelectOption] = useState("도서명");
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState(booksList);
  // 무한스크롤
  // ref : 이것은 React의 ref 객체이다. 감지하고자 하는 DOM 요소에 이 ref를 할당해야 한다.
  // inView : 이것은 불리언(boolean) 값이다. 감시하고 있는 요소가 화면에 보일 때 true가 되고, 화면에서 벗어날 때 false가 된다.
  // threshold : 요소의 어느부분이 뷰포트에 들어와야 inView가 true가 될지 결정 - 0~1의값
  const [ref, inView] = useInView({threshold: 0.5});

  // Fn
  const handleSearchFn = (e) => {
    if (e === "도서명") {
      setList(booksList.filter((book) => book.title.toLowerCase().includes(searchInput.toLowerCase())));
    } else if (e === "저자명") {
      setList(booksList.filter((book) => book.author.toLowerCase().includes(searchInput.toLowerCase())));
    } else if (e === "ISBN") {
      setList(booksList.filter((book) => book.ISBN.toLowerCase().includes(searchInput.toLowerCase())));
    } else if (e === "출판사") {
      setList(booksList.filter((book) => book.publisher.toLowerCase().includes(searchInput.toLowerCase())));
    } else if (e === "장르") {
      setList(booksList.filter((book) => book.genre.toLowerCase().includes(searchInput.toLowerCase())));
    } else {
      setList(booksList);
    }
  };
  // useEffect
  // 검색
  useEffect(() => {
    handleSearchFn(selectOption);
  }, [searchInput]);
  // 무한스크롤
  useEffect(() => {
    if(inView){
      // 화면에 보이는 경우 실행할 로직
      console.log("로딩~~")
    }
  },[inView]);

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        {/* 도서 리스트 */}
        <SearchBox searchOption={searchOption} setSelectOption={setSelectOption} setSearchInput={setSearchInput} />
        <div className="book-list-wrap">
          <ul className="book-list">
            {list.map((book) => (
              <li key={book.ISBN} ref={ref}>
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
