// SubArea 컴포넌트 - SubArea.jsx

import { Outlet } from "react-router-dom";
import SubTop from "../module/SubTop";

export default function SubArea() {
  return (
    <main className="sub-container" id="main">
      <SubTop/>
      <Outlet/>
    </main>
  );
} //////////// MainArea 컴포넌트 ///////////
