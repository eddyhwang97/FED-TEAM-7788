//  Join 컴포넌트 - Join.jsx
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import SubTop from '../module/SubTop';

import join from '../../css/page/join.scss';
function Join({ gnb1, gnb2 }) {
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='join-container' id='join'>
        <section className='join-wrap'>
          <div className='input-wrap'>
            <input
              type='text'
              className='input-box'
              placeholder='휴대폰번호를 입력해주세요.'
            />
            <input
              type='text'
              className='input-box'
              placeholder='이름을 입력해주세요.'
            />
            <div className='password-wrap'>
              <input
                type='password'
                id='password'
                className='input-box'
                placeholder='비밀번호를 입력해주세요.'
              />
              <span className='toggle-password'> 👁️ </span>
            </div>
          </div>
          <div className='validation-wrap'>
            <div className='password-strength'>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
            </div>
            <ul className='password-checklist'>
              <li>✔ 영문, 숫자, 특수문자 포함 8자리 이상</li>
              <li>✔ 공백 및 3자 이상의 연속/중복 문자 사용 불가</li>
            </ul>
          </div>
          <input
            type='password'
            className='input-box'
            placeholder='비밀번호확인'
          />
          <button className='join-btn'>회원가입</button>
        </section>
      </div>
    </>
  );
}
export default Join;
