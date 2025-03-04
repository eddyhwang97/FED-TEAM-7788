// SearchBox 컴포넌트 - SearchBox.jsx
import React, { useEffect, useState } from "react";
import communityData from "../../js/data/community_data.json";

function SearchBox({ searchOption, setSelectOption, setSearchInput }) {
  // Fn
  const changeSelectValue = (e) => {
    setSelectOption(e.target.value);
  };
  const changeSearchValue = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-box-wrap">
      <form action="" method="get"></form>
      <div className="search-box input-type">
        <select name="option" id="search-option" onChange={changeSelectValue}>
          {searchOption.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
        <input type="text" className="search-keywords" placeholder="검색어를 입력하세요." onChange={changeSearchValue} />
        <button className="search-button" ></button>
      </div>
    </div>
  );
}

export default SearchBox;
