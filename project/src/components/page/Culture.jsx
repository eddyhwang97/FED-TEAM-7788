//  도서대출
import { useEffect, useLayoutEffect, useState, createContext } from "react";
import SubTop from "../module/SubTop";

function Culture({ gnb1, gnb2 }) {
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="contents">
        <div className="sub-section">
          <p className="section-tit">강연신청</p>
          <div className="inner">
            <ul className="bullet-list">
              <li>
                <span className="bullet type1 step1">대출 자격</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">도서관 아이디를 가지고 있는 회원 본인</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">14세 미만 회원의 경우 법적 대리인의 동의하에 대출 가능</span>
                  </li>
                </ul>
              </li>
              <li>
                <span className="bullet type1 step1">대출 권수 및 기간</span>
                <ul>
                  <li className="step2">
                    <span className="bullet type2 step2">대출권수: 회원 1인당 5권까지 가능</span>
                  </li>
                  <li className="step2">
                    <span className="bullet type2 step2">대출기간: 최대 7일</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="sub-section">
          <p className="section-tit">도서 반납 안내</p>
          <div className="inner">
            <ul className="step-list">
                
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Culture;
