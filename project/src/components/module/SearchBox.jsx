// SearchBox 컴포넌트 - SearchBox.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";

function SearchBox({ props }) {
  // searchOption : select 아래 option
  // selectOption : 선택된 option
  // handleSearchFn : 검색기능
  const navigate = useNavigate();

  // props
  const location = props.location;
  const searchOption = props.searchOption;
  const selectOption = props.selectOption;
  const setSelectOption = props.setSelectOption;
  const setSearchInput = props.setSearchInput;
  const navigateSearchInput = props.navigateSearchInput;

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
              if (e.target.value.length > 0) navigate(`${location}/:${e.target.value}`, { state: { navigateSearchInput: e.target.value } });
              else {
                alert("검색어를 입력하세요.");
                navigate(`${location}`);
              }
            }
          }}
          type="text"
          className="search-keywords"
          placeholder={navigateSearchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-button"
          onClick={() => {
            const inputValue = $(".search-box input").val();
            if (inputValue.length > 0) navigate(`${location}/:${inputValue}`, { state: { navigateSearchInput: inputValue } });
            else {
              alert("검색어를 입력하세요.");
              navigate(`${location}`);
            }
          }}
        ></button>
      </div>
    </div>
  );
}

export default SearchBox;
