// Layout 컴포넌트 - Layout.jsx

import React from "react";
import { useLocation } from "react-router-dom"; // 현재 경로 확인
import { GP } from "../module/Contexter";
import { useState } from "react";
import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import SubArea from "./SubArea";
import TopArea from "./TopArea";

export default function Layout() {
  // 로그인 데이터
  const user = sessionStorage.getItem("loggedInUser") ? JSON.parse(sessionStorage.getItem("loggedInUser")) : null;
  const [isLogin, setLogin] = useState(user ? true : false);
  const loginState = { isLogin, setLogin };
  // hook
  const location = useLocation(); // 현재 경로 가져오기

  // 메인 페이지인지 판별 (예: "/" 또는 "/home" 같은 경로)
  const isMainPage = location.pathname === "/" || location.pathname === "/home";

  return (
    <GP.Provider value={{ user, loginState }}>
      <TopArea />
      {isMainPage ? <MainArea /> : <SubArea />}
      <FooterArea />
    </GP.Provider>
  );
}
