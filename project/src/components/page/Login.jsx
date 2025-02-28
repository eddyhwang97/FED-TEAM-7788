//  Login 컴포넌트 - Login.jsx
import { useEffect, useLayoutEffect, useState, createContext} from 'react';
import { useNavigate } from 'react-router-dom'; 
import SubTop from '../module/SubTop';

import login from '../../css/page/login.scss';

import member_data from '../../js/data/member_data.json';
localStorage.setItem('member_data', JSON.stringify(member_data));

function Login({ gnb1, gnb2 }) {
  const navigate = useNavigate(); // useNavigate 훅

  const [phoneNum, setphoneNum] = useState('');
  const [phoneValid, setphoneValid] = useState(false);
  const [pw, setpw] = useState('');
  const [pwValid, setpwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

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

  // 비밀번호 유효성 검사 //
  const handlePw = (e) => {
    const newPw = e.target.value;
    setpw(newPw); // 상태 업데이트 -> 비동기 처리 보완
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    if (regex.test(newPw)) {
      setpwValid(true);
    } else {
      setpwValid(false);
    }
  };

  // 로그인 버튼 클릭시 로컬스토리지 데이터와 비교
  const onClickConfirmButton = () => {
    const cleanPhoneNum = phoneNum.replace(/\D/g, ''); // 숫자만 남기기
    const member_data = JSON.parse(localStorage.getItem('member_data')) || [];
    const user = member_data.find(
      (m) => m.id.replace(/\D/g, '') === cleanPhoneNum && m.pw === pw
    );
    if (user) {
      alert('로그인에 성공하였습니다.');
      navigate('/'); // 로그인 성공 후 메인페이지 이동
    } else {
      alert('휴대폰번호 혹은 비밀번호를 확인해주세요.');
    }
  };

  // 휴대폰 번호, 비밀번호 유효성을 통과할 때만 로그인 버튼 활성화
  useEffect(() => {
    if (phoneValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [phoneValid, pwValid]);

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
                value={pw}
                onChange={handlePw}
              />
              <div className='errorMessageWrap'>
                {!pwValid && pw.length > 0 && (
                  <div>올바른 비밀번호를 입력해주세요.</div>
                )}
              </div>
            </div>
            <button
              onClick={onClickConfirmButton}
              disabled={notAllow}
              className='login-btn'
            >
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
