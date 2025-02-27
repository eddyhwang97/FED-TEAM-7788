// Layout 컴포넌트 - Layout.jsx

import { useLocation } from "react-router-dom"; // 현재 경로 확인


import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import SubArea from "./SubArea";
import TopArea from "./TopArea";
import { useState } from "react";

export default function Layout() {
  const location = useLocation(); // 현재 경로 가져오기

  // 메인 페이지인지 판별 (예: "/" 또는 "/home" 같은 경로)
  const isMainPage = location.pathname === "/" || location.pathname === "/home";

  return (
    <>
      <TopArea />
      <MainArea/>
      <FooterArea />
    </>
  );
}
