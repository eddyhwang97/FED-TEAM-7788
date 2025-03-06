// SearchBox 컴포넌트 - SearchBox.jsx
import React, { useEffect, useState } from "react";
import communityData from "../../js/data/community_data.json";

function SearchBox({ searchOption, selectOption, setSelectOption, setSearchInput, handleSearchFn }) {
  // searchOption : select 아래 option
  // selectOption : 선택된 option
  // handleSearchFn : 검색기능

  return (
    <div className="search-box-wrap">
      <form action="" method="get"></form>
      <div className="search-box input-type">
        <select
          name="option"
          id="search-option"
          onChange={(e) => {
            setSelectOption(e.target.value);
          }}
        >
          {searchOption.map((v, i) => (
            <option key={i} value={v}>
              {v}
            </option>
          ))}
        </select>
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleSearchFn(selectOption);
            }
          }}
          type="text"
          className="search-keywords"
          placeholder="검색어를 입력하세요."
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            handleSearchFn(selectOption);
          }}
        ></button>
      </div>
    </div>
  );
}

export default SearchBox;
