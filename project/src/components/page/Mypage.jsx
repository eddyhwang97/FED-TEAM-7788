//  Mypage 컴포넌트 - Mypage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTop from '../module/SubTop';
import hm from '../../css/page/hm.scss';
import book_data from '../../js/data/book_data.json';
import badge_data from '../../js/data/badge_data.json';

// 로컬스토리지 도서 데이터 저장 (초기 1회)
if (!localStorage.getItem('book_data')) {
  localStorage.setItem('book_data', JSON.stringify(book_data));
}

// ISBN을 통해 책의 장르를 찾는 함수
const getGenreByISBN = (book) => {
  if (!book || !book.isbn) {
    return null; // isbn이 없으면 null 반환
  }

  const foundBook = book_data.find(b => b.ISBN && b.ISBN.toString().toLowerCase() === book.isbn.toLowerCase());
  return foundBook ? foundBook.genre : null;  // 장르가 없다면 null 반환
};

// 뱃지 데이터
const badgeData = badge_data

function Mypage({ gnb1, gnb2 }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [picked, setPicked] = useState(0);
  const [currentBook, setCurrentBook] = useState(0);
  const [finished, setFinished] = useState(0);
  const [pickedBooks, setPickedBooks] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  // 세션스토리지 데이터가 없는 경우 알림창 호출 및 메인페이지 강제이동
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      updateLevel(parsedUser.bData.length || 0); // 유저 레벨 업데이트

      // 찜 개수 업데이트
      if (parsedUser.iLoveIt) {
        setPicked(parsedUser.iLoveIt);
        setCurrentBook(parsedUser.currentData) ;
        setFinished(parsedUser.bData);
      }
    }
  }, [navigate]);

  // picked의 isbn , book_data의 isbn 비교 후 책 정보 저장
  useEffect(() => {
    if (picked.length > 0) {
      const books = picked
        .map((isbn) =>
          book_data.find(
            (book) => book.ISBN.toLocaleLowerCase() == isbn.toLocaleLowerCase()
          )
        ) // 일치여부
        .filter((book) => book !== undefined); // 존재하는 책만 필터링
      setPickedBooks(books); // 찾은 책 목록을 상태로 저장
    }
  }, [picked]);

  // 레벨 계산 함수
  const updateLevel = (booksRead) => {
    let lvl = 1,
      needed = 0;

    if (booksRead >= 12) {
      lvl = 4;
      needed = 0;
    } else if (booksRead >= 6) {
      lvl = 3;
      needed = 6 - booksRead;
    } else if (booksRead >= 3) {
      lvl = 2;
      needed = 3 - booksRead;
    }

    setLevel(lvl);
    setCurrent(booksRead - getMinBooks(lvl));
    setTotal(getMaxBooks(lvl) - getMinBooks(lvl) + 1);
    setProgress(
      ((booksRead - 1 - getMinBooks(lvl)) /
        (getMaxBooks(lvl) - getMinBooks(lvl))) *
        100
    );
  };
  // 레벨 최소도서
  const getMinBooks = (lvl) => {
    return [0, 0, 3, 6, 12][lvl];
  };

  // 레벨 최대도서
  const getMaxBooks = (lvl) => {
    return [0, 2, 5, 11, 30][lvl];
  };

  useEffect(()=>{
    // 컴포넌트 처음 렌더링시 로컬스토리지에서 이미지 불러오기
    const loggedInUserSession = sessionStorage.getItem('loggedInUser');
    if (loggedInUserSession) {
      const parsedUserSession = JSON.parse(loggedInUserSession);
      const userId = parsedUserSession.id;

      // 로컬스토리지에서 member_data 가져오기
      const memberData = localStorage.getItem('member_data');
      if (memberData) {
        const parsedMembers = JSON.parse(memberData);

        // 로그인 유저 프로필 이미지 찾기
        const currentUser = parsedMembers.find(member => member.id === userId);
        if (currentUser && currentUser.profileImage) {
          setProfileImage(currentUser.profileImage); // 프로필 이미지 상태 업데이트
        } else {
          // 프로필 이미지가 없으면 기본 이미지 설정
          setProfileImage('/img/sub/img-profile-temp.jpg');
        }
      }
    }
  },[]);

   // 프로필 이미지 선택 핸들러
   const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64로 이미지 데이터 변환
        setProfileImage(base64Image);

      // 로컬스토리지에 Base64 이미지 URL 저장
      const memberData = localStorage.getItem('member_data');
      if (memberData) {
        const parsedMembers = JSON.parse(memberData);
  
        // 세션스토리지 로그인 데이터
        const loggedInUserSession = sessionStorage.getItem('loggedInUser');
        if (loggedInUserSession) {
          const parsedUserSession = JSON.parse(loggedInUserSession);
          const userId = parsedUserSession.id;
  
          // memberData 배열에서 로그인 데이터 찾아서 프로필 이미지 업데이트
          const updatedMembers = parsedMembers.map((member) =>
            member.id === userId ? { ...member, profileImage: base64Image } : member
          );
  
          // 로컬스토리지에 업데이트된 member_data 저장
          localStorage.setItem('member_data', JSON.stringify(updatedMembers));
  
          // 세션스토리지에서 로그인한 유저의 프로필 이미지 업데이트
          parsedUserSession.profileImage = base64Image;
          sessionStorage.setItem('loggedInUser', JSON.stringify(parsedUserSession));
        }
      }
    };
    reader.readAsDataURL(file); // Base64로 변환
    }
  };


  // 뱃지 시스템 시작 // 
  const badges = badgeData;

  useEffect(() => {
    const loggedInUserSession = sessionStorage.getItem('loggedInUser');
    
    if (loggedInUserSession) {
      const parsedUserSession = JSON.parse(loggedInUserSession);
      const bData = parsedUserSession.bData;

      if (Array.isArray(bData) && bData.length > 0) {
        // 카테고리별로 대출된 책의 수를 카운트
        const genreCount = {
          "문학": 0,
          "인문사회과학": 0,
          "예술": 0,
          "매거진": 0
        };
  
        // ISBN을 통해 카테고리 추출 후 카운트
        bData.forEach(book => {
          const genre = getGenreByISBN(book);  // ISBN을 통해 카테고리 추출
          if (genre) {
            genreCount[genre]++;
          }
        });
  
        // 각 카테고리에서 3권 이상 대출한 경우 활성화된 뱃지 필터링
        const unlockedBadges = badgeData.filter(badge => {
          const genre = badge.badgeDescription.split(' ')[0]; // 뱃지 설명에서 카테고리 추출
          return genreCount[genre] >= 3;
        });
  
        setUnlockedBadges(unlockedBadges);  // 활성화된 뱃지 업데이트
      }
    }
  }, []);


  useEffect(() => {
    const loggedInUserSession = sessionStorage.getItem('loggedInUser');
    
    if (loggedInUserSession) {
      const parsedUserSession = JSON.parse(loggedInUserSession);
      const bData = parsedUserSession.bData;

      if (Array.isArray(bData) && bData.length > 0) {
        // 카테고리별로 대출된 책의 수를 카운트
        const genreCount = {
          "문학": 0,
          "인문사회과학": 0,
          "예술": 0,
          "매거진": 0
        };
  
        // ISBN을 통해 카테고리 추출 후 카운트
        bData.forEach(book => {
          const genre = getGenreByISBN(book);  // ISBN을 통해 카테고리 추출
          if (genre) {
            genreCount[genre]++;
          }
        });
  
        // 각 카테고리에서 3권 이상 대출한 경우 활성화된 뱃지 필터링
        const unlockedBadges = badgeData.filter(badge => {
          const genre = badge.badgeDescription.split(' ')[0]; // 뱃지 설명에서 카테고리 추출
          return genreCount[genre] >= 3;
        });
  
        setUnlockedBadges(unlockedBadges);  // 활성화된 뱃지 업데이트
      }
    }
  }, []);

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className='contents'>
        <div className='mypage-wrap'>
          <div className='inner-section profile-wrap'>
            <div className='profile-box'>
              <div className='profile-image'>
                <img
                  src={profileImage || '/img/sub/img-profile-temp.png'} // 선택한 이미지나 기본 이미지
                  alt='프로필 이미지'
                  onClick={() =>
                    document.getElementById('profile-image-input').click()
                  } // 이미지 클릭 시 파일 선택
                />
                <input
                  type='file'
                  id='profile-image-input'
                  style={{ display: 'none' }}
                  onChange={handleProfileImageChange}
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
                    <span
                      className='bar'
                      style={{ width: `${progress}%` }}
                    ></span>
                  </div>
                  <p className='left'>
                    <span className='current'>{current}</span> /{' '}
                    <span className='total'>{total}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='right'>
              <div className='level-box'>
                <div className='level'>
                  <img
                    src={`/img/sub/img-level${level}.svg`}
                    alt={`레벨 ${level}`}
                    className='level-img'
                  />
                  <div className='level-txt'>
                    <p>
                      LV.<span className='level-num'>{level}</span>
                    </p>
                    <em>
                      {
                        [
                          '독서 뚜벅이',
                          '독서 러너',
                          '독서 부릉이',
                          '독서광 폭주열차',
                        ][level - 1]
                      }
                    </em>
                  </div>
                </div>
                <a href='#' className='more-btn'></a>
              </div>
              <div className='my-book'>
                <div className='book-box borrow'>
                  <p>대출 중</p>
                  <span className='borrow-num'>{currentBook?.length? currentBook.length : 0}</span>
                </div>
                <div className='book-box picked'>
                  <p>찜</p>
                  <span className='picked-num'>{picked?.length? picked.length : 0}</span>
                </div>
                <div className='book-box read'>
                  <p>다 읽었어요</p>
                  <span className='read-num'>{finished?.length? finished.length : 0 }</span>
                </div>
              </div>
            </div>
          </div>
          <div className='inner-section my-book-info-wrap'>
            <ul className='my-book-info'>
              <li className='borrow'>
                <p className='section-tit'>대출 중이에요</p>
                <ul className='borrow-list'>
                  {currentBook.length > 0 ? (
                    currentBook.map((book) => {
                      const foundBook = book_data.find(
                        (b) => b.ISBN.toLowerCase() === book.isbn.toLowerCase()
                      );
                      return foundBook ? (
                        <li key={book.isbn}>
                          <em className='book-name'>{foundBook.title}</em>
                          <span className='date'>~{book.dueDate}</span>
                        </li>
                      ) : null;
                    })
                  ) : (
                    <li>대출한 책이 없습니다.</li>
                  )}
                </ul>
              </li>
              <li className='pick'>
                <p className='section-tit'>마음에 들어요</p>
                <ul className='pick-list'>
                  {pickedBooks.length > 0 ? (
                    pickedBooks.map((book, index) => (
                      <li key={`${book.isbn ?? `index-${index}`}-${book.dueDate ?? "nodate"}`}>
                        <em className='book-name'>{book.title}</em>
                        <span className='label'>{book.genre.replace("인문사회과학","인문사회")}</span>
                      </li>
                    ))
                  ) : (
                    <li>찜한 책이 없습니다.</li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
          <div className='inner-section badge-wrap'>
            <ul className='badge-list'>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-996-3.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-997-3.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-998-3.png' alt='배지' />
                </div>
                <div className='text-box'>
                  <p>인문학 입문학?</p>
                  <span>인문사회과학 카테고리 도서 5권 대출하기</span>
                </div>
              </li>
              <li>
                <div className='img-box'>
                  <img src='/img/sub/img-badge-999-3.png' alt='배지' />
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
