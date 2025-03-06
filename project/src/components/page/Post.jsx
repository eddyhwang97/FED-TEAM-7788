import React, { use, useState } from "react";
import SubTop from "../module/SubTop";
import $ from "jquery";

import "../../css/page/post.scss";
import { useLocation, useNavigate } from "react-router-dom";

function Post({ gnb1, gnb2 }) {
  const navigate = useNavigate();
  const postLocation = useLocation();
  const user = postLocation.state.user;
  console.log(user);

  // 로그인 상태변수

  const getContent = () => {
    const title = $("#title").val();
    const content = $("#text-content").val();
    if (title === "" || content === "") {
      alert("제목과 내용을 모두 입력하세요.");
    } else {
      setArticle(title, content);
      alert("등록되었습니다.");
      navigate("/community/freeboard");
    }

    console.log(title, content);
  };
  const setArticle = (title, content) => {
    if (localStorage.community_data) {
      const communityData = JSON.parse(localStorage.getItem("community_data"))
        .filter((v) => v.type === "freeboard")
        .sort((a, b) => (a.idx == b.idx ? -1 : a.idx < b.idx ? -1 : 1));
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getDate() + 1 < 10 ? "0" + (today.getDate() + 1) : today.getDate() + 1}`;
      communityData.push({
        idx: communityData[communityData.length - 1].idx + 1,
        type: "freeboard",
        image: "",
        title: title,
        user: user,
        content: content,
        date: formattedDate,
      });
      localStorage.setItem("community_data", JSON.stringify(communityData));
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="post-section">
        <div className="write-board">
          <form action="write_process.php" method="post" encType="multipart/form-data">
            <div className="write-form">
              <div className="form-group title">
                <input type="text" id="title" name="title" placeholder="제목" required />
              </div>
              <div className="form-group text-content">
                <input id="text-content" name="content" placeholder="내용을 입력하세요." required />
              </div>
              <div className="btn-wrap">
                <button type="button" className="submit-btn" onClick={getContent}>
                  등록
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => {
                    handleGoBack();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Post;
