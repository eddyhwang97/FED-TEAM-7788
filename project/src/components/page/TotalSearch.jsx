import React, { useState } from "react";
import SearchBox from "../module/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight} from"@fortawesome/free-solid-svg-icons" 
import { useLocation, useParams } from "react-router-dom";
import $ from "jquery"

// css
import "../../css/page/totalsearch.scss"

function TotalSearch() {
    const location = useLocation();
    const navigateSearchInput = location.state.navigateSearchInput;
    const {results} = useParams();

    const searchOption = ["통합검색"]
    const [searchInput, setSearchInput] = useState(navigateSearchInput);

    console.log(searchInput, results);
    const handleSearchFn=()=>{
        console.log(searchInput)
    }
    
  return (
    <>
      <div className="contents">
        <SearchBox searchOption={searchOption} searchInput={searchInput} setSearchInput={setSearchInput} handleSearchFn={handleSearchFn}    />
        <div className="search-result">
          <section className="result-section">
            <h3 className="category-tit">도서</h3>
            <div className="result-list">
                <ul>
                    <li className="list">
                        <a href="#">
                            <p>명탐정코난:검은그림자의 역습..범인은 바로 너야!!</p>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </li>
                </ul>

            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">공지사항</h3>
            <div className="result-list">
                <ul>
                    <li className="list">
                        <a href="#">
                            <p>명탐정코난:검은그림자의 역습..범인은 바로 너야!!</p>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </li>
                </ul>

            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">공지사항</h3>
            <div className="result-list">
                <ul>
                    <li className="list">
                        <a href="#">
                            <p>명탐정코난:검은그림자의 역습..범인은 바로 너야!!</p>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </li>
                </ul>

            </div>
          </section>
          <section className="result-section">
            <h3 className="category-tit">공지사항</h3>
            <div className="result-list">
                <ul>
                    <li className="list">
                        <a href="#">
                            <p>명탐정코난:검은그림자의 역습..범인은 바로 너야!!</p>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </a>
                    </li>
                </ul>

            </div>
          </section>
          
        </div>
      </div>
    </>
  );
}

export default TotalSearch;
