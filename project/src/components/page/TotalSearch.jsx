import React, { useState } from "react";
import SearchBox from "../module/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import $ from "jquery";

// css
import "../../css/page/totalsearch.scss";

function TotalSearch() {
  // data
  const bookData = JSON.parse(localStorage.getItem("book_data"));
  const communityData = JSON.parse(localStorage.getItem("community_data"));
  const noticeData = communityData.filter((v) => v.type === "notice");
  const freeboardData = communityData.filter((v) => v.type === "freeboard");
  const faqData = communityData.filter((v) => v.type === "faq");

  // hook
  const location = useLocation();
  const navigate = useNavigate();
  const navigateSearchInput = location.state.navigateSearchInput;

  const searchOption = ["통합검색"];
  const [searchInput, setSearchInput] = useState(navigateSearchInput);

  // useState
  const [bookList, setbookList] = useState([]);
  const [noticeList, setnoticeList] = useState([]);
  const [freeboardList, setfreeboardList] = useState([]);
  const [faqList, setfaqList] = useState([]);
  // Fn
  const handleSearchFn = (e) => {
    return;
  };
  const filterDataFn = (e) => {
    if (e.length === 0) {
      setbookList([]);
      setnoticeList([]);
      setfreeboardList([]);
      setfaqList([]);
    } else {
      setbookList(bookData.filter((book) => book.title.toLowerCase().trim().includes(e.toLowerCase().trim())));
      setnoticeList(noticeData.filter((notice) => notice.title.toLowerCase().trim().includes(e.toLowerCase().trim())));
      setfreeboardList(freeboardData.filter((freeboard) => freeboard.title.toLowerCase().trim().includes(e.toLowerCase().trim())));
      setfaqList(faqData.filter((faq) => faq.title.toLowerCase().trim().includes(e.toLowerCase().trim())));
    }
  };

  useEffect(() => {
    filterDataFn(navigateSearchInput)
   
  },[navigate])

  return (
    <>
      <div className="contents">
        <SearchBox searchOption={searchOption}  navigateSearchInput={navigateSearchInput} searchInput={searchInput} setSearchInput={setSearchInput} handleSearchFn={handleSearchFn} filterDataFn={filterDataFn} />
        <div className="search-result">
          <section className="result-section">
            <h3 className="category-tit">도서</h3>
            <div className="result-list books-list">
              <ul>
                {bookList.length > 0 ? (
                  bookList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">공지사항</h3>
            <div className="result-list notice-list">
              <ul>
                {noticeList.length > 0 ? (
                  noticeList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section faq-list">
            <h3 className="category-tit">FAQ</h3>
            <div className="result-list">
              <ul>
                {faqList.length > 0 ? (
                  faqList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">자유게시판</h3>
            <div className="result-list freeboard-list">
              <ul>
               {freeboardList.length > 0 ? (
                  freeboardList.map((v, i) => (
                    <li className="list" key={i}>
                      <a href="#">
                        <p>{v.title}</p>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </a>
                    </li>
                  ))
                ) : (
                  <li>검색결과가 없습니다.</li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default TotalSearch;
