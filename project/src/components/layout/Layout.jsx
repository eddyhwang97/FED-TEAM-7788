// Layout 컴포넌트 - Layout.jsx

import "../../css/page/main.scss";
import "../../css/page/community.scss";

import FooterArea from "./FooterArea";
import MainArea from "./MainArea";
import SubArea from "./SubArea";
import TopArea from "./TopArea";
import { useState } from "react";

export default function Layout() {
 
  return (
    <>
      <TopArea />
      <MainArea  />
      <FooterArea />
    </>
  );
}
