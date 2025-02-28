//  Login 컴포넌트 - Login.jsx
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import SubTop from '../module/SubTop';

import login from '../../css/page/login.scss';

function Login({ gnb1, gnb2 }) {
  const [phoneNum, setphoneNum] = useState('');
  const [phoneValid, setphoneValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handlePhoneNumber = (e) => {
    setphoneNum(e.target.value);
    const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    if (regex.test(phoneNum)) {
      setphoneValid(true);
    } else {
      setphoneValid(false);
    }
  };

  useEffect(()=>{
    if(phoneValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  },[phoneValid]);
  
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='page-cover'>
        <div className='login-container' id='login'>
          <section className='login-wrap'>
            <div className='input-wrap'>
              <input
                type='text'
                className='input-box'
                placeholder='휴대폰 번호'
                value={phoneNum}
                onChange={handlePhoneNumber}
              />
              <div className='errorMessageWrap'>
                {!phoneValid && phoneNum.length > 0 && (
                  <div>올바른 휴대폰번호를 입력해주세요.</div>
                )}
              </div>
              <input
                type='password'
                className='input-box'
                placeholder='비밀번호'
              />
            </div>
            <button disabled={notAllow} className='login-btn'>
              로그인
            </button>
            <hr className='divider' />
            <button className='join-btn'>회원가입</button>
          </section>
        </div>
      </div>
    </>
  );
}
export default Login;
