//  Join 컴포넌트 - Join.jsx
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import SubTop from '../module/SubTop';

import join from '../../css/page/join.scss';
function Join({ gnb1, gnb2 }) {
  // 휴대폰 //
  const [phoneNum, setphoneNum] = useState('');
  const [phoneValid, setphoneValid] = useState(false);
  // 이름 //
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  // 비밀번호 //
  const [pw, setpw] = useState('');
  const [pwValid, setpwValid] = useState(false);
  // 비밀번호 확인 //
  const [pwCheck, setpwCheck] = useState('');
  const [pwCheckValid, setpwCheckValid] = useState(false);

  // 핸드폰 번호 유효성 검사 //
  const handlePhoneNumber = (e) => {
    setphoneNum(e.target.value);
    const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (regex.test(phoneNum)) {
      setphoneValid(true);
    } else {
      setphoneValid(false);
    }
  };
  // 이름 유효성 검사 //
  const handleName = (e) => {
    setName(e.target.value);
    const regex = /^[A-Za-z가-힣]{2,20}$/;
    if (regex.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

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
              value={phoneNum}
              onChange={handlePhoneNumber}
            />
            <div className='errorMessageWrap'>
              {!phoneValid && phoneNum.length > 0 && (
                <div>올바른 휴대폰번호를 입력해주세요.</div>
              )}
            </div>
            <input
              type='text'
              className='input-box'
              placeholder='이름을 입력해주세요.'
              value={name}
              onChange={handleName}
            />
            <div className='errorMessageWrap'>
              {!nameValid && name.length > 0 && (
                <div>올바른 형식으로 입력해주세요.</div>
              )}
            </div>
            <div className='password-wrap'>
              <input
                type='password'
                id='password'
                className='input-box'
                placeholder='비밀번호를 입력해주세요.'
                value={pw}
                onChange={(e) => setpw(e.target.value)}
              />
              <span className='toggle-password'> 👁️ </span>
            </div>
            <div className='errorMessageWrap'>
              올바른 형식으로 입력해주세요.
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
            value={pwCheck}
            onChange={(e) => setpwCheck(e.target.value)}
          />
          <div className='errorMessageWrap'>비밀번호가 일치하지 않습니다.</div>
          <button disabled={true} className='join-btn'>
            회원가입
          </button>
        </section>
      </div>
    </>
  );
}
export default Join;
