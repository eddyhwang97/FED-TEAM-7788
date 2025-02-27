//  Login 컴포넌트 - Login.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Login({gnb1,gnb2}) {
  return (
    <>
    <SubTop gnb1={gnb1} gnb2={gnb2}/>
      <h1>로그인</h1>
    </>
  );
}
export default Login;
