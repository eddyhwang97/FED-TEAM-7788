import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 JS
import "./css/common/_core.scss";
import Main from "./components/page/Main";
import Book from "./components/page/Book";
import Community from "./components/page/Community";
import Error from "./components/page/Error";
import Join from "./components/page/Join";
import Mypage from "./components/page/Mypage";
import Login from "./components/page/Login";
import Search from "./components/page/Search";
import Monthly from "./components/page/Monthly";
import BookList from "./components/page/BookList";
import BookDetail from "./components/page/BookDetail";
import Borrow from "./components/page/Borrow";
import Article from "./components/page/Article";
import Post from "./components/page/Post";

export default function MainComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="book/borrow" element={<Borrow gnb1="예약/대출" gnb2="도서대출" />}  />
          <Route path="book/reserve" element={<Book gnb1="예약/대출" gnb2="도서예약"/>}  />
          <Route path="community/notice" element={<Community gnb1="열린공간" gnb2="공지사항" data="notice"/>}  />
          <Route path="community/notice/:id" element={<Article gnb1="열린공간" gnb2="공지사항" />}  />
          <Route path="community/faq" element={<Community gnb1="열린공간" gnb2="FAQ" data="faq"/>}  />
          <Route path="community/freeboard" element={<Community gnb1="열린공간" gnb2="자유게시판" data="freeboard"/>}  />
          <Route path="community/freeboard/post" element={<Post gnb1="열린공간" gnb2="자유게시판 글쓰기" data="post"/>}  />
          <Route path="community/freeboard/:id" element={<Article gnb1="열린공간" gnb2="자유게시판"/>}  />
          <Route path="join" element={<Join gnb1="회원가입" gnb2=""/>}  />
          <Route path="login" element={<Login gnb1="로그인" gnb2=""/>}  />
          <Route path="mypage" element={<Mypage gnb1="마이페이지" gnb2=""/>}  />
          <Route path="search/totalsearch" element={<Search gnb1="자료검색" gnb2="통합검색"/>}  />
          <Route path="search/best" element={<BookList gnb1="자료검색" gnb2="베스트셀러"/>}  />
          <Route path="search/new" element={<BookList gnb1="자료검색" gnb2="신착도서"/>}  />
          <Route path="monthly/recommend" element={<Monthly gnb1="이달의도서" gnb2="편집장 추천 도서"/>}  />
          <Route path="book/:isbn" element={<BookDetail />} /> {/* 책 상세 페이지 */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(<MainComponent />);
