// SubArea 컴포넌트 - SubArea.jsx

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";

export default function SubArea({gnb1,gnb2}) {
  return (
    <main className="sub-container" id="main">
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <Outlet/>
    </main>
  );
} //////////// MainArea 컴포넌트 ///////////
