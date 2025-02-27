// SubTop 컴포넌트 - SubTop.jsx
import React from "react";
// import { Link } from "react-router-dom";
// import {menu} from "../../js/data/gnb_data.js";

function SubTop(props) {
  return (
    <>
    <div className="sub-top">
       <ul className="breadcrumb">
         <li className="home">
           <a href="/"><span className="icon home"></span></a>
         </li>
         <li className="1depth"><a href="#">원뎁스</a></li>
         <li className="2depth"><a href="#">투뎁스</a></li>
       </ul>
       <div className="title-box">
         <h3 className="sub-title">페이지 서브 타이틀이 들어갑니다.</h3>
         <ul className="sub-link">
           <li className="link-copy">
             <button type="button">
               <img src="../img/common/icon-link.svg" alt="링크 공유 버튼" />
             </button>
             <div className="url-copy">
               <input type="text" id="urlCopy" defaultValue="" />
               <label htmlFor="urlCopy"></label>
               <button type="button">복사</button>
             </div>
           </li>
           <li className="link-print">
             <button type="button">
               <img src="../img/common/icon-print.svg" alt="페이지 프린트 버튼" />
             </button>
           </li>
         </ul>
       </div>
     </div>
    </>
  )
  
}

export default SubTop;
