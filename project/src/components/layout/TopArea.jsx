// TopArea 컴포넌트 - TopArea.jsx
// css
import "../../css/common/_core.scss";
// data & Fn
import { Link, useNavigate } from "react-router-dom";
import Gnb from "../module/Gnb";
import { menu2 } from "../../js/data/gnb_data";
import * as layoutFn from "../../js/function/layout.js";

export default function TopArea({ gnb, setGnb, setSubTop }) {
  const navigate = useNavigate();
  const loggedInUser = sessionStorage.getItem('loggedInUser');

  // 로그아웃 처리 함수
  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.removeItem("loggedInUser");
      alert("로그아웃이 완료되었습니다.");
      navigate("/");
      console.clear();
    }
  };

  // 로그인/로그아웃 클릭 처리
  const handleLoginLogoutClick = (v) => {
    if (v.txt === "로그아웃") {
      handleLogout();
    } else {
      navigate(v.link);
    }
  };

  // 로그인 시 "로그인" 버튼을 제외한 메뉴 필터링
  const filteredMenu = menu2.filter((v) => !(loggedInUser && v.txt === "로그인"));

  return (
    <>
      <div className="dimm"></div>
      <div className="search-dimm"></div>
      {/* <!-- header s --> */}
      <header className="header">
        <div className="header-top">
          <ul className="link-list">
           {loggedInUser && (
              <li>
                <button type="button" onClick={handleLogout} className="icon-logout">
                  로그아웃
                </button>
              </li>
            )}

            {/* 필터링된 메뉴 리스트 출력 */}
            {filteredMenu.map((v, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleLoginLogoutClick(v)}
                  className={"icon" + v.class}
                >
                  {v.txt}
                </button>
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
            <Gnb gnb={gnb} setGnb={setGnb} setSubTop={setSubTop}/>
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
