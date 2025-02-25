// Gnb 컴포넌트 - Gnb.jsx
import React from "react";
import { Link } from "react-router-dom";
import {menu} from "../../js/data/gnb_data.js";


function Gnb(props) {
  return (
    <div className="gnb-wrap">
      <div className="gnb-top">
        <div className="gnb-util">
          <button className="account-btn">
            <span className="blind">나의공간</span>
          </button>
          <button className="menu-close-btn">
            <span className="blind">메뉴닫기</span>
          </button>
        </div>
      </div>
      <nav className="gnb">
        <ul className="gnb-list">
          {menu.map((v, i) => (
            <li className="dep1" key={i}>
              <Link to={v.link}>{v.txt}</Link>
              <ul className="dep2">
                {v.sub.map((v, i) => (
                  <li key={i}>
                    <Link to={v.link}>{v.txt}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Gnb;
