//  Book 컴포넌트 - Book.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Book({gnb1,gnb2}) {
  return (
    <>
    <SubTop gnb1={gnb1} gnb2={gnb2}/>
      <h1>도서신청</h1>
    </>
  );
}

export default Book;
