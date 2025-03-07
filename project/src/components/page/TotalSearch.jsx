import React from "react";
import SearchBox from "../module/SearchBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight} from"@fortawesome/free-solid-svg-icons" 

function TotalSearch() {
  return (
    <>
      <div className="contents">
        <SearchBox />
        <div className="search-result">
          <section className="result-section">
            <h3 className="category-tit">도서</h3>
            <div className="result-list">
                <ul>
                    <li className="list">
                        <a href="#">
                            <h4>명탐정코난:검은그림자의 역습..범인은 바로 너야!!</h4>
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
