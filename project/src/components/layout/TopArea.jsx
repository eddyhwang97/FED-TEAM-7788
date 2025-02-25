// TopArea 컴포넌트 - TopArea.jsx
// css
import "../../css/common/_core.scss";
// data & Fn
import { Link } from "react-router-dom";
import Gnb from "../module/Gnb";
import { menu2 } from "../../js/data/gnb_data";
import * as layoutFn from "../../js/function/layout.js";

export default function TopArea() {
  return (
    <>
      <div className="dimm"></div>
      <div className="search-dimm"></div>
      {/* <!-- header s --> */}
      <header className="header">
        <div className="header-top">
          <ul className="link-list">
            {menu2.map((v,i)=>(

            <li key={i}>
              <Link to={v.link}>
                <span className={"icon"+v.class}>{v.txt}</span>
              </Link>
            </li>
            ))}
          </ul>
        </div>
        <div className="inner-header-wrap">
          <div className="inner-header">
            <h1 className="logo">
              <Link to="/">
                <img src="../img/common/logo-temp.svg" alt="로고" />
              </Link>
            </h1>
            <Gnb />
            <div className="header-util">
              <button type="button" className="total-search-btn">
                <span className="blind">통합검색 버튼</span>
              </button>
              <button type="button" className="search-close-btn">
                <span className="blind">통합검색 닫기 버튼</span>
              </button>
              <button type="button" className="menu-btn">
                <span className="blind">메뉴 버튼</span>
              </button>
            </div>
            <div className="pc-header-util">
              <button type="button" className="total-search-btn"></button>
              <button type="button" className="search-close-btn"></button>
            </div>
          </div>
        </div>
        <div className="search-wrap">
          <div className="search-form">
            <form action="search.php">
              <fieldset>
                <legend className="blind">도서 통합검색 폼</legend>
                <input type="text" id="mainSearchText" name="searchTxt" title="검색어" placeholder="찾으시는 도서가 있나요?" />
                <button type="button" className="total-search-btn"></button>
              </fieldset>
            </form>
          </div>
        </div>
      </header>
    </>
  );
}
