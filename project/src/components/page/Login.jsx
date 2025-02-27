//  Login 컴포넌트 - Login.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

import login from "../../css/page/login.scss";

function Login({gnb1,gnb2}) {
  return (
    <>
    <SubTop gnb1={gnb1} gnb2={gnb2}/>
    <div className="page-cover">
      <div className="login-container" id="login">
        <section className="login-wrap">
          <div className="input-wrap">
            <input type="text" className="input-box" placeholder="휴대폰 번호" />
            <input type="password" className="input-box" placeholder="비밀번호" />
          </div>
          <button className="login-btn">로그인</button>
          <hr className="divider" />
          <button className="join-btn">회원가입</button>
        </section>
      </div>
    </div>
    </>
  );
}
export default Login;
