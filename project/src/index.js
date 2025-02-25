import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 JS
import "./css/common/_core.scss"
import Main from "./components/page/Main";
import Book from "./components/page/Book";
import Community from "./components/page/Community";
import Error from "./components/page/Error";
import Join from "./components/page/Join";
import Mypage from "./components/page/Mypage";
import Login from "./components/page/Login";
import Search from "./components/page/Search";
import Monthly from "./components/page/Monthly";

export default function MainComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="book/borrow" element={<Book />} />
          <Route path="book/reserve" element={<Book />} />
          <Route path="community" element={<Community />} />
          <Route path="community/notice" element={<Community />} />
          <Route path="community/faq" element={<Community />} />
          <Route path="community/freeboard" element={<Community />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="mypage" element={<Mypage />} />
          <Route path="search/totalsearch" element={<Search />} />
          <Route path="search/best" element={<Search />} />
          <Route path="search/new" element={<Search />} />
          <Route path="monthly/recommend" element={<Monthly />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(<MainComponent />);
