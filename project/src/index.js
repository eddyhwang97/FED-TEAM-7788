import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// 전체 JS
import "./css/common/_core.scss";
import Main from "./components/page/Main";
import Community from "./components/page/Join";
import Join from "./components/page/Join";

import Mypage from "./components/page/Mypage";

export default function MainComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="community" element={<Community />} />
          <Route path="error" element={<Error />} />
          <Route path="join" element={<Join />} />
          <Route path="login" element={<Login />} />
          <Route path="mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const wrapper = ReactDOM.createRoot(document.querySelector(".wrapper"));
wrapper.render(<MainComponent />);
