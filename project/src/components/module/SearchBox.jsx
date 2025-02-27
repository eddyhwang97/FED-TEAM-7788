// SearchBox 컴포넌트 - SearchBox.jsx
import React, { useEffect, useState } from "react";
import communityData from "../../js/data/community_data.json";

function SearchBox({ }) {
 

  return (
    <div className="search-box-wrap">
      <form action="" method="get"></form>
      <div className="search-box input-type">
        <select name="option" id="search-option">
          <option value="제목">제목</option>
          <option value="작성자">작성자</option>
          <option value="내용">내용</option>
        </select>
        <input type="text" className="search-keywords"  placeholder="검색어를 입력하세요."  />
        <button className="search-button"></button>
      </div>
    </div>
  );
}

export default SearchBox;
