// SearchBox 컴포넌트 - SearchBox.jsx
import React  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery"

function SearchBox({location, searchOption, setSelectOption,searchInput,setSearchInput,navigateSearchInput }) {
  // searchOption : select 아래 option
  // selectOption : 선택된 option
  // handleSearchFn : 검색기능
  const navigate = useNavigate();

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
              console.log(e.target.value);
              navigate(`${location}/:${e.target.value}`,{state:{ navigateSearchInput : e.target.value}})
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
            
            const inputValue = $('input').val();
            navigate(`${location}/:${inputValue}`,{state:{ navigateSearchInput : inputValue}})
          }}
        ></button>
      </div>
    </div>
  );
}

export default SearchBox;
