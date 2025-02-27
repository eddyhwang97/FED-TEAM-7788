// SubArea 컴포넌트 - SubArea.jsx

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";

export default function SubArea({gnb1,gnb2}) {
  return (
    <main className="sub-container" id="main">
<<<<<<<<< Temporary merge branch 1
      <SubTop/>
      <Outlet/>
    </main>
  );
} //////////// MainArea 컴포넌트 ///////////
