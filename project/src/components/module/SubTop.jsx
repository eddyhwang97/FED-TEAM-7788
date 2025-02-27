// SubTop 컴포넌트 - SubTop.jsx
import { React, createContext } from "react";
import gnb_data from "../../js/data/gnb_data";
import { Link } from "react-router-dom";

function SubTop({ gnb1, gnb2 }) {
  return (
    <div className="sub-top">
      <ul className="breadcrumb">
        <li className="home">
          <Link to={"/"}>
            <span className="icon home"></span>
          </Link>
        </li>
        <li className="1depth">{gnb1}</li>
        {gnb2 !== "" && <li className="2depth">{gnb2}</li>}
      </ul>
      <div className="title-box">
        <h3 className="sub-title">{gnb2 === "" ? gnb1 : gnb2}</h3>
        <ul className="sub-link">
          <li className="link-copy">
            <button type="button">
              <img src="../img/common/icon-link.svg" alt="링크 공유 버튼" />
            </button>
            <div className="url-copy">
              <input type="text" id="urlCopy" />
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
  );
}

export default SubTop;
