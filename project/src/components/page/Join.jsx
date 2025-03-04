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
  const [showPw, setshowPw] = useState(false); // 비밀번호 보이기 토글
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
    const newName = e.target.value
    setName(newName); // 상태 업데이트 -> 비동기 처리 보완
    const regex = /^[A-Za-z가-힣]{2,20}$/;
    if (regex.test(name)) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  // 비밀번호 유효성 검사 //
  const handlePw = (e) => {
    const newPw = e.target.value;
    setpw(newPw); // 상태 업데이트 -> 비동기 처리 보완

    // 유효성 조건 //
    const regex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  const minLength = /.{8,}/;
  const hasUpper = /[A-Z]/;
  const hasNoSpaces = !/\s/;
  const noRepeat = !/(.)\1\1/.test(newPw);

  // 조건 충족여부 상태관리 //
  const isValidLength = minLength.test(newPw);
  const isValidUpper = hasUpper.test(newPw);
  const isValidNoSpaces = hasNoSpaces;
  const isValidNoRepeat = noRepeat;

  const barStyles = [isValidLength, isValidUpper, isValidNoSpaces, isValidNoRepeat];
  
  // 조건 충족 개수를 기반으로 bar 색상 설정
  const validConditions = [
    isValidLength,
    isValidUpper,
    isValidNoSpaces,
    isValidNoRepeat
  ];
  
  // 조건 충족시 green
  const barColors = barStyles.map((valid) => (valid ? 'green' : 'gray'));

  // 상태를 기반으로 스타일 설정
  setPasswordStrength(barColors);

   // passwordChecks 업데이트 (각 조건 충족 여부)
   setPasswordChecks({
    length: isValidLength,
    upper: isValidUpper,
    noSpaces: isValidNoSpaces,
    noRepeat: isValidNoRepeat
  });

    // pwValid 설정: 모든 조건이 만족되면 true
    setpwValid(validConditions.every(Boolean));
  };

const [passwordStrength, setPasswordStrength] = useState(['gray', 'gray', 'gray']);
const [passwordChecks, setPasswordChecks] = useState({
  length: false,
  upper: false,
  noSpaces: false,
  noRepeat: false
});

  

 // 비밀번호 보이기/숨기기 처리 함수 //
 const togglePw = () => {
  setshowPw(!showPw); // showPassword 상태를 반전시킴
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
                type={showPw ? 'text' : 'password'} // 비밀번호 보이기/숨기기
                id='password'
                className='input-box'
                placeholder='비밀번호를 입력해주세요.'
                value={pw}
                onChange={handlePw}
              />
              <span className='toggle-password' onClick={togglePw}>
                {showPw ? '🙈' : '👁️'} {/* 아이콘으로 비밀번호 보이기/숨기기 상태 표시 */}
              </span>
            </div>
            <div className='errorMessageWrap'>
            </div>
          </div>
          <div className='validation-wrap'>
            <div className='password-strength'>
              <div className='bar' style={{ backgroundColor : passwordStrength[0]}}></div>
              <div className='bar' style={{ backgroundColor : passwordStrength[1]}}></div>
              <div className='bar' style={{ backgroundColor : passwordStrength[2]}}></div>
            </div>
            <ul className='password-checklist'>
              <li className={passwordChecks.length ? 'valid' : ''}>✔ 영문, 숫자, 특수문자 포함 8자리 이상</li>
              <li className={passwordChecks.upper ? 'valid' : ''}>✔ 대문자 포함</li>
              <li className={passwordChecks.noSpaces ? 'valid' : ''}>✔ 공백 및 3자 이상의 연속/중복 문자 사용 불가</li>
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
