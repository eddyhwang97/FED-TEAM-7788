//  Search 컴포넌트 - Search.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Search({gnb1,gnb2}) {
  return (
    <>
    <SubTop gnb1={gnb1} gnb2={gnb2}/>
      <h1>검색</h1>
    </>
  );
}

export default Search;
