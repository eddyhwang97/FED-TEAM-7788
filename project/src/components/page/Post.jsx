import React, { useState } from "react";
import SubTop from "../module/SubTop";

function Post({ gnb1, gnb2 }) {
  // 로그인 상태변수
  const [onUser, userStatus] = useState(false);
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
                <textarea id="text-content" name="content" placeholder="내용을 입력하세요." required></textarea>
              </div>
              <div className="btn-wrap">
                <button type="submit" className="submit-btn">
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
