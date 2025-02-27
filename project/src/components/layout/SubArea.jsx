// SubArea 컴포넌트 - SubArea.jsx

import { Outlet } from "react-router-dom";

export default function SubArea({ gnb1, gnb2 }) {
  return (
    <main className="sub-container" id="main">
      <Outlet />
    </main>
  );
} //////////// MainArea 컴포넌트 ///////////
