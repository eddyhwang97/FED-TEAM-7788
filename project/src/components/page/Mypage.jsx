//  Mypage 컴포넌트 - Mypage.jsx
import { useEffect, useLayoutEffect, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
// Sub Top //
import SubTop from '../module/SubTop';
// css //
import hm from '../../css/page/hm.scss';

function Mypage({ gnb1, gnb2 }) {
  
  // 세션스토리지 데이터가 없는 경우 알림창 호출 및 메인페이지 강제이동
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if(!loggedInUser){
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  },[navigate]);


  const [user, setUser] = useState(null);

  useEffect(() => {
    // 세션스토리지에서 사용자 정보 로딩
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (loggedInUser){
      // 데이터가 있는 경우 JSON 파싱 후 user 상태로 설정
      setUser(JSON.parse(loggedInUser));
    }
  },[]);
  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='contents'>
        <div className='mypage-wrap'>
          <div className='inner-section profile-wrap'>
            <div className='profile-box'>
              <div className='profile-image'>
                <img
                  src='/img/sub/img-profile-temp.jpg'
                  alt='임시 프로필 이미지'
                />
              </div>
              <div className='user-info'>
                {/* user 상태로부터 직접 렌더링 */}
                {user && (
                  <>
                    <p className='user-name'>{user.name}</p>
                    <span className='user-id'>{user.id}</span>
                  </>
                )}
                <div className='next-level'>
                  <p>다음 레벨까지</p>
                  <div className='progress'>
                    <span className='bar'></span>
                  </div>
                  <p className='left'>
                    <span className='current'>1</span> /{' '}
                    <span className='total'>3</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='level-box'>
                <div className='level'>
                  <img
                    src='/img/sub/img-level1.svg'
                    alt='레벨 1'
                    className='level-img'
                  />
                  <div className='level-txt'>
                    <p>
                      LV.<span className='level-num'>1</span>
                    </p>
                    <em>독서 뚜벅이</em>
                  </div>
                </div>
                <a href='#' className='more-btn'></a>
              </div>
              <div className='my-book'>
                <div className='book-box borrow'>
                  <p>대출 중</p>
                  <span className='borrow-num'>3</span>
                </div>
                <div className='book-box picked'>
                  <p>찜</p>
                  <span className='picked-num'>20</span>
                </div>
                <div className='book-box read'>
                  <p>다 읽었어요</p>
                  <span className='read-num'>22</span>
                </div>
              </div>
            </div>
          </div>
          <div className='inner-section my-book-info-wrap'>
            <ul className='my-book-info'>
              <li className='borrow'>
                <p className='section-tit'>대출 중이에요</p>
                <ul className='borrow-list'>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='date'>~2025.02.24</span>
                  </li>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='date'>~2025.02.24</span>
                  </li>
                  <li>
                    <em className='book-name'>
                      거부기의 저주 거부기의 저주 거부기의 저주
                    </em>
                    <span className='date'>~2025.02.24</span>
                  </li>
                  <li>
                    <em className='book-name'>
                      거부기의 저주 거부기의 저주 거부기의 저주
                    </em>
                    <span className='date'>~2025.02.24</span>
                  </li>
                  <li>
                    <em className='book-name'>
                      거부기의 저주 거부기의 저주 거부기의 저주
                    </em>
                    <span className='date'>~2025.02.24</span>
                  </li>
                </ul>
              </li>
              <li className='pick'>
                <p className='section-tit'>마음에 들어요</p>
                <ul className='pick-list'>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='label'>인문사회</span>
                  </li>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='label'>문학</span>
                  </li>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='label'>문학</span>
                  </li>
                  <li>
                    <em className='book-name'>거부기의 저주</em>
                    <span className='label'>문학</span>
                  </li>
                  <li>
                    <em className='book-name'>
                      거부기의 저주거부기의 저주거부기의 저주거부기의
                      저주거부기의 저주거부기의 저주거부기의 저주거부기의
                      저주거부기의 저주
                    </em>
                    <span className='label'>문학</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className='inner-section badge-wrap'>
            <ul className='badge-list'>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-1.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-2.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-3.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-4.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-king.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mypage;
