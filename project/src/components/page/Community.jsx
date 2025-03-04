import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Router, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// data
import communityData from "../../js/data/community_data.json";

// css
import "../../css/page/community.scss";
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";

function Community({ gnb1, gnb2, data }) {
  const navigate = useNavigate();
  // variables
  const noticeList = communityData.filter((v) => v.type === "notice").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const faqList = communityData.filter((v) => v.type === "faq").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const freeboardList = communityData.filter((v) => v.type === "freeboard").sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1));
  const searchOption = ["제목", "내용", "작성자"];
  // useState
  const [activeTab, setActiveTab] = useState(data);
  const [activeList, setActiveList] = useState(data);
  // 로그인 상태변수
  const [onUser, userStatus] = useState(false);

  // function
  const toggleListFn = (e) => {
    const list = document.querySelectorAll("#faq-tab .list");
    list.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
  };
  const goLogin = () => {
    if (!onUser) {
      alert("로그인이 필요합니다.");
      window.location.href = "/login";
    }
  };
  // 레이아웃 렌더링
  useEffect(() => {
    console.log(data);
    setActiveTab(data);
    window.scrollTo(0, 0);
  }, [useLocation()]);
  // 로그인 상태 확인
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      userStatus(true);
    } else userStatus(false);
    console.log(onUser, user);
  }, [onUser]);
  return (
    <>
      {/* <!-- sub-top s --> */}
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      {/* <!-- sub-top e --> */}
      {/* <!-- search-box s --> */}
      {/* <!-- search-box e --> */}
      {/* <!-- contents s --> */}
      <div className="contents">
        <div className="content">
          <SearchBox searchOption={searchOption} />
          {/* <!-- tab-section s --> */}
          <div className="tab-section">
            <div className="tabs">
              <div
                id="notice-tab"
                className={activeTab === "notice" ? "tab notice-tab-button active" : "tab notice-tab-button"}
                onClick={() => {
                  setActiveTab("notice");
                  setActiveList("notice");
                }}
              >
                <Link to={"/community/notice"}>공지사항</Link>
              </div>

              <div
                id="faq-tab"
                className={activeTab === "faq" ? "tab faq-tab-button active" : "tab faq-tab-button"}
                onClick={() => {
                  setActiveTab("faq");
                  setActiveList("faq");
                }}
              >
                <Link to={"/community/faq"}>FAQ</Link>
              </div>
              <div
                id="freeboard-tab"
                className={activeTab === "freeboard" ? "tab freeboard-tab-button active" : "tab freeboard-tab-button"}
                onClick={() => {
                  setActiveTab("freeboard");
                  setActiveList("freeboard");
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
              <div id="notice-list" className={activeList === "notice" ? "table active" : "table"}>
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {noticeList.map((v, i) => (
                    <li key={v.idx} className="list" data-type={v.type} data-key={v.idx}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/community/${data}/${v.idx}`);
                        }}
                      >
                        <div className="list-header">
                          <p className="list-num">{i + 1}</p>
                          <p className="list-title">{v.title}</p>
                          <p className="list-date">{v.date}</p>
                          <p className="list-user">{v.user}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="faq-list" className={activeList === "faq" ? "table active" : "table"}>
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {faqList.map((v, i) => (
                    <li
                      className="list"
                      key={v.idx}
                      onClick={(e) => {
                        toggleListFn(e.currentTarget);
                      }}
                    >
                      <div className="list-header">
                        <p className="list-num">{i + 1}</p>
                        <p className="list-title">{v.title}</p>
                        <p className="list-date">{v.date}</p>
                        <p className="list-user">{v.user}</p>
                      </div>
                      <div className="list-info">
                        <strong>{v.content}</strong>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="freeboard-list" className={activeList === "freeboard" ? "table active" : "table"}>
                <div className="table-top">
                  <ul>
                    <li className="list-num">번호</li>
                    <li className="list-title">제목</li>
                    <li className="list-date">날짜</li>
                    <li className="list-user">작성자</li>
                  </ul>
                </div>
                <ul>
                  {freeboardList.map((v, i) => (
                    <li key={v.idx} className="list" data-type={v.type} data-key={v.idx}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/community/${data}/${v.idx}`);
                        }}
                      >
                        <div className="list-header">
                          <p className="list-num">{i + 1}</p>
                          <p className="list-title">{v.title}</p>
                          <p className="list-date">{v.date}</p>
                          <p className="list-user">{v.user}</p>
                        </div>
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
          </div>

          {/* <!-- pagnat-section e --> */}
          {/* <!-- article-section s --> */}

          {/* <!-- article-section e --> */}
          {/* <!-- post-section s --> */}

          {/* <!-- post-section e --> */}
        </div>
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
