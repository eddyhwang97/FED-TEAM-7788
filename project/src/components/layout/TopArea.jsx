// TopArea 컴포넌트 - TopArea.jsx

import { Link } from "react-router-dom";
import { Fragment } from "react";

export default function TopArea() {
  return (
    <Fragment>
      <div class="dimm"></div>
      <div class="search-dimm"></div>
      {/* <!-- header s --> */}
      <header class="header">
        <div class="header-top">
          <ul class="link-list">
            <li>
              <a href="#">
                <span class="icon login"></span>로그인
              </a>
            </li>
            <li>
              <a href="#">
                <span class="icon join"></span>회원가입
              </a>
            </li>
          </ul>
        </div>
        <div class="inner-header-wrap">
          <div class="inner-header">
            <h1 class="logo">
              <img src="../img/common/logo-temp.svg" alt="로고" />
            </h1>
            <div class="gnb-wrap">
              <div class="gnb-top">
                <div class="gnb-util">
                  <button class="account-btn">
                    <span class="blind">나의공간</span>
                  </button>
                  <button class="menu-close-btn">
                    <span class="blind">메뉴닫기</span>
                  </button>
                </div>
              </div>
              <nav class="gnb">
                <ul class="gnb-list">
                  <li class="dep1">
                    <a href="#">자료검색</a>
                    <ul class="dep2">
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
                  <li class="dep1">
                    <a href="#">예약/대출</a>
                    <ul class="dep2">
                      <li>
                        <a href="#">도서대출</a>
                      </li>
                      <li>
                        <a href="#">도서예약</a>
                      </li>
                    </ul>
                  </li>
                  <li class="dep1">
                    <a href="#">이달의 도서</a>
                    <ul class="dep2">
                      <li>
                        <a href="#">편집장 추천 도서</a>
                      </li>
                    </ul>
                  </li>
                  <li class="dep1">
                    <a href="#">열린공간</a>
                    <ul class="dep2">
                      <li>
                        <a href="#">공지사항</a>
                      </li>
                      <li>
                        <a href="#">자유게시판</a>
                      </li>
                    </ul>
                  </li>
                  <li class="dep1">
                    <a href="#">이벤트</a>
                    <ul class="dep2">
                      <li>
                        <a href="#">작가 강연 예약</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="header-util">
              <button type="button" class="total-search-btn">
                <span class="blind">통합검색 버튼</span>
              </button>
              <button type="button" class="search-close-btn">
                <span class="blind">통합검색 닫기 버튼</span>
              </button>
              <button type="button" class="menu-btn">
                <span class="blind">메뉴 버튼</span>
              </button>
            </div>
            <div class="pc-header-util">
              <button type="button" class="total-search-btn"></button>
              <button type="button" class="search-close-btn"></button>
            </div>
          </div>
        </div>
        <div class="search-wrap">
          <div class="search-form">
            <form action="search.php">
              <fieldset>
                <legend class="blind">도서 통합검색 폼</legend>
                <input type="text" id="mainSearchText" name="searchTxt" title="검색어" placeholder="찾으시는 도서가 있나요?" />
                <button type="button" class="total-search-btn"></button>
              </fieldset>
            </form>
          </div>
        </div>
      </header>
    </Fragment>
  );
}
