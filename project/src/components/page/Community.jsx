import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { GP } from "../module/Contexter";

// data
import communityData from "../../js/data/community_data.json";

// css
import "../../css/page/community.scss";

// components
import SubTop from "../module/SubTop";
import SearchBox from "../module/SearchBox";
import {Pagenation} from "../module/Pagenation";

// 데이터 로컬스토리지 저장
if (!localStorage.community_data) {
  localStorage.setItem("community_data", JSON.stringify(communityData));
}
function Community({ gnb1, gnb2, data }) {
  const {results} = useParams();
  // hook
  const context = useContext(GP);
  const navigate = useNavigate();
  const location = useLocation();
  const navigateSearchInput = location.state===null ? null:location.state.navigateSearchInput;
  // 로그인 정보
  // loginState는 boolean값으로 로그인상태에따라 사용해야할때 쓰시면됩니다
  const loginState = context.loginState.isLogin;
  // 로그인 상태면 유저정보 뜨고 없으면 null값으로 처리
  const user = loginState ? context.user : null;
  // 로그인 상태면 유저이름 뜨고 없으면 null값으로 처리
  // const userName = user !== null ? user.name : null;
  // console.log("유저", user, "유저이름", userName, "로그인 상황", loginState);

  // variables
  const searchOption = ["제목", "내용", "작성자"];
  const listData = JSON.parse(localStorage.getItem("community_data"))
    .filter((x) => x.type === data)
    .sort((a, b) => (a.date == b.date ? 0 : a.date > b.date ? -1 : 1));
  // useState
  const [activeTab, setActiveTab] = useState(data);
  // 검색 옵션
  const [selectOption, setSelectOption] = useState("제목");
  // 검색어 입력값
  const [searchInput, setSearchInput] = useState("");
  const [list, setList] = useState(listData);

  // function
  const toggleListFn = (e) => {
    const list = document.querySelectorAll("#faq-tab .list");
    list.forEach((e) => {
      e.classList.remove("active");
    });
    e.classList.contains("active") ? e.classList.remove("active") : e.classList.add("active");
  };
  const handleSearchFn = (selectOption,value) => {
    if (value !== null) {
      if (selectOption === "제목") {
        setList(listData.filter((v) => v.title.toLowerCase().trim().includes(value.toLowerCase().trim())));
      } else if (selectOption=== "내용") {
        setList(listData.filter((v) => v.content.toLowerCase().trim().includes(value.toLowerCase().trim())));
      } else if (selectOption=== "작성자") {
        setList(listData.filter((v) => v.user.toLowerCase().trim().includes(value.toLowerCase().trim())));
      }
      // 초기 검색값없을때 전체셋팅
    } else setBoardListFn(data);
  };

  const setBoardListFn = (e) => {
    const listData = JSON.parse(localStorage.getItem("community_data"));
    setList(listData.filter((x) => x.type === e).sort((a, b) => (a.date === b.date ? -1 : a.date > b.date ? -1 : 1)));
  };
  const goLogin = () => {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
  };
  // 레이아웃 렌더링
  useEffect(() => {
    setActiveTab(data);
    setBoardListFn(data);
    window.scrollTo(0, 0);
  }, [data]);
  useEffect(()=>{
    handleSearchFn(selectOption,navigateSearchInput)
  },[navigateSearchInput,setList])
  // 로그인 상태 확인

  // 페이지네이션 변수 할당
  const [currentPage, setcurrentPage] = useState(1);
  const perPage = 10;
  const totalPage = Math.ceil(list.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentList = list.slice(startIndex, endIndex);

  // pagenation props
  const pagenationProps = {
    data: data,
    loginState: loginState,
    totalPage,
    currentList,
    currentPage,
    setcurrentPage,
    goLogin: goLogin,
    setBoardListFn,
  };
  useEffect(()=>{

  },[setcurrentPage])

  // return
  return (
    <>
      {/* <!-- sub-top s --> */}
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      {/* <!-- sub-top e --> */}

      {/* <!-- contents s --> */}
      <div className="contents">
        <div className="content">
          {/* <!-- search-box s --> */}
          <SearchBox location={`/community/${data}`} searchOption={searchOption} selectOption={selectOption} setSelectOption={setSelectOption} setSearchInput={setSearchInput} navigateSearchInput={navigateSearchInput} />
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
                  {currentList.map((v, i) => (
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
                          e.preventDefault();
                          if (data === "freeboard" || data === "notice") {
                            navigate(`/community/${data}/${v.idx}`, { state: { user: v.user, listIdx: v.idx, data: data } });
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
          <Pagenation props={pagenationProps} />
          {/* <!-- pagnat-section e --> */}
        </div>
      </div>
      {/* <!-- contents e --> */}
    </>
  );
}

export default Community;
