// TopArea 컴포넌트 - TopArea.jsx

import { Link } from "react-router-dom";
import { Fragment } from "react";

export default function TopArea() {
  return (
    <Fragment>
      <div className="dimm"></div>
      <div className="search-dimm"></div>
      {/* <!-- header s --> */}
      <header className="header">
        <div className="header-top">
          <ul className="link-list">
            <li>
              <a href="#">
                <span className="icon login"></span>로그인
              </a>
            </li>
            <li>
              <a href="#">
                <span className="icon join"></span>회원가입
              </a>
            </li>
          </ul>
        </div>
        <div className="inner-header-wrap">
          <div className="inner-header">
            <h1 className="logo">
              <img src="../img/common/logo-temp.svg" alt="로고" />
            </h1>
            <div className="gnb-wrap">
              <div className="gnb-top">
                <div className="gnb-util">
                  <button className="account-btn">
                    <span className="blind">나의공간</span>
                  </button>
                  <button className="menu-close-btn">
                    <span className="blind">메뉴닫기</span>
                  </button>
                </div>
              </div>
              <nav className="gnb">
                <ul className="gnb-list">
                  <li className="dep1">
                    <a href="#">자료검색</a>
                    <ul className="dep2">
                      <li>
                        <a href="#">통합검색</a>
                      </li>
                      <li>
                        <a href="#">베스트셀러</a>
                      </li>
                      <li>
                        <a href="#">신착도서</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dep1">
                    <a href="#">예약/대출</a>
                    <ul className="dep2">
                      <li>
                        <a href="#">도서대출</a>
                      </li>
                      <li>
                        <a href="#">도서예약</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dep1">
                    <a href="#">이달의 도서</a>
                    <ul className="dep2">
                      <li>
                        <a href="#">편집장 추천 도서</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dep1">
                    <a href="#">열린공간</a>
                    <ul className="dep2">
                      <li>
                        <a href="#">공지사항</a>
                      </li>
                      <li>
                        <a href="#">자유게시판</a>
                      </li>
                    </ul>
                  </li>
                  <li className="dep1">
                    <a href="#">이벤트</a>
                    <ul className="dep2">
                      <li>
                        <a href="#">작가 강연 예약</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-util">
              <button type="button" className="total-search-btn">
                <span className="blind">통합검색 버튼</span>
              </button>
              <button type="button" className="search-close-btn">
                <span className="blind">통합검색 닫기 버튼</span>
              </button>
              <button type="button" className="menu-btn">
                <span className="blind">메뉴 버튼</span>
              </button>
            </div>
            <div className="pc-header-util">
              <button type="button" className="total-search-btn"></button>
              <button type="button" className="search-close-btn"></button>
            </div>
          </div>
        </div>
        <div className="search-wrap">
          <div className="search-form">
            <form action="search.php">
              <fieldset>
                <legend className="blind">도서 통합검색 폼</legend>
                <input type="text" id="mainSearchText" name="searchTxt" title="검색어" placeholder="찾으시는 도서가 있나요?" />
                <button type="button" className="total-search-btn"></button>
              </fieldset>
            </form>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
