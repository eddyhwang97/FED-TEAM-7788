//  Mypage 컴포넌트 - Mypage.jsx
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Mypage ({gnb1,gnb2}){
    return(
        <>
        <SubTop gnb1={gnb1} gnb2={gnb2}/>
        <h1>마이페이지</h1>
        </>
    )
}

export default Mypage