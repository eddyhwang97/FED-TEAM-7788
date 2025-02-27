//  Join 컴포넌트 - Join.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Join({gnb1,gnb2}) {
  return (
    <>
    <SubTop gnb1={gnb1} gnb2={gnb2} />
      <h1>회원가입</h1>
    </>
  );
}
export default Join;
