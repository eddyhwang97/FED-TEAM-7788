import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// data
import communityData from "../../js/data/community_data.json";
import commentData from "../../js/data/article_comment_data.json";

// css
import "../../css/page/community.scss";
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

// 데이터 로컬스토리지 저장
localStorage.setItem("community_data",JSON.stringify(communityData));
if (!localStorage.comment_data) {
  localStorage.setItem("comment_data", JSON.stringify(commentData));
}
//   아이디 임시데이터 저장
let user1 = { user: "John" };
if (!sessionStorage.user1) {
  sessionStorage.setItem("user1", JSON.stringify(user1));
}
function Community({ gnb1, gnb2, data }) {
  const navigate = useNavigate();
  // variables
  const searchOption = ["제목", "내용", "작성자"];
  // useState
  const [activeTab, setActiveTab] = useState(data);
  // 로그인 상태변수
  const [onUser, userStatus] = useState(false);
  // 검색 옵션
  const [selectOption, setSelectOption] = useState("제목");
  // 검색어 입력값
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState([]);

  // function
  const toggleListFn = (e) => {
    const list = document.querySelectorAll("#faq-tab .list");
    list.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
  };
  const handleSearchFn = (e) => {
    if (e === "제목") {
      setList(list.filter((v) => v.title.toLowerCase().trim().includes(searchInput.toLowerCase().trim())));
    } else if (e === "내용") {
      setList(list.filter((v) => v.content.toLowerCase().trim().includes(searchInput.toLowerCase().trim())));
    } else if (e === "작성자") {
      setList(list.filter((v) => v.user.toLowerCase().trim().includes(searchInput.toLowerCase().trim())));
    }
  };

  const setBoardListFn = (e) => {
    const listData = JSON.parse(localStorage.getItem("community_data"));
    setList(listData.filter((x) => x.type === e).sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1)));
  };
  const goLogin = () => {
    if (!onUser) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };
  // 레이아웃 렌더링
  useEffect(() => {
    setActiveTab(data);
    window.scrollTo(0, 0);
  }, [useLocation()]);
  useEffect(() => {
    setBoardListFn(data);
    console.log(data);
  }, [useLocation()]);
  // 로그인 상태 확인
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      userStatus(true);
    } else userStatus(false);
  }, [onUser]);
  return ( 
    <>
      {/* <!-- sub-top s --> */}
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      {/* <!-- sub-top e --> */}

      {/* <!-- contents s --> */}
      <div className="contents">
        <div className="content">

          {/* <!-- search-box s --> */}
          <SearchBox searchOption={searchOption} selectOption={selectOption} setSelectOption={setSelectOption} setSearchInput={setSearchInput} handleSearchFn={handleSearchFn} />
          {/* <!-- search-box e --> */}

          {/* <!-- tab-section s --> */}
          <div className="tab-section">
            <div className="tabs">
              <div
                id="notice-tab"
                className={activeTab === "notice" ? "tab notice-tab-button active" : "tab notice-tab-button"}
                onClick={() => {
                  setActiveTab("notice");
                }}
              >
                <Link to={"/community/notice"}>공지사항</Link>
              </div>
              <div
                id="faq-tab"
                className={activeTab === "faq" ? "tab faq-tab-button active" : "tab faq-tab-button"}
                onClick={() => {
                  setActiveTab("faq");
                }}
              >
                <Link to={"/community/faq"}>FAQ</Link>
              </div>
              <div
                id="freeboard-tab"
                className={activeTab === "freeboard" ? "tab freeboard-tab-button active" : "tab freeboard-tab-button"}
                onClick={() => {
                  setActiveTab("freeboard");
                }}
              >
                <Link to={"/community/freeboard"}>자유게시판</Link>
              </div>
            </div>
          </div>
          {/* <!-- tab-section e --> */}

          {/* <!-- board-section s --> */}
          <div className="board-section">
            <div className="tab-content">
              <div id={`${data}-list`} className="table active">
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {list.map((v, i) => (
                    <li
                      key={v.idx}
                      className="list"
                      data-type={v.type}
                      data-key={v.idx}
                      onClick={(e) => {
                        toggleListFn(e.currentTarget);
                      }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          if (data === "freeboard" || data === "notice") {
                            e.preventDefault();
                            navigate(`/community/${data}/${v.idx}`);
                          }
                        }}
                      >
                        <div className="list-header">
                          <p className="list-num">{i + 1}</p>
                          <p className="list-title">{v.title}</p>
                          <p className="list-date">{v.date}</p>
                          <p className="list-user">{v.user}</p>
                        </div>
                        {data === "faq" && (
                          <div className="list-info">
                            <strong>{v.content}</strong>
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* <!-- board-section e --> */}

          {/* <!-- pagenate-section s --> */}
          <div className="pagenate-section">
            <button type="button" className="btn-prev"></button>
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <button type="button" className="btn-next"></button>
            {data === "freeboard" && (
              <button
                type="button"
                className="write-btn"
                onClick={() => {
                  if (!onUser) goLogin();
                  else navigate(`/community/freeboard/post`);
                }}
              >
                글쓰기
              </button>
            )}
          </div>
          {/* <!-- pagnat-section e --> */}
        </div>
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
