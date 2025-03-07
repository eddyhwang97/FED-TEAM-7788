//  Mypage 컴포넌트 - Mypage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTop from '../module/SubTop';
import hm from '../../css/page/hm.scss';
import book_data from '../../js/data/book_data.json';

// 로컬스토리지 도서 데이터 저장 (초기 1회)
if (!localStorage.getItem('book_data')) {
  localStorage.setItem('book_data', JSON.stringify(book_data));
}

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
        setCurrentBook(parsedUser.currentData);
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
      ((booksRead - getMinBooks(lvl)) / (getMaxBooks(lvl) - getMinBooks(lvl))) *
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
                  <span className='borrow-num'>{currentBook.length}</span>
                </div>
                <div className='book-box picked'>
                  <p>찜</p>
                  <span className='picked-num'>{picked.length}</span>
                </div>
                <div className='book-box read'>
                  <p>다 읽었어요</p>
                  <span className='read-num'>{finished.length}</span>
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
                          <span className='date'>~{book.returnDate}</span>
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
                    pickedBooks.map((book) => (
                      <li key={book.isbn}>
                        <em className='book-name'>{book.title}</em>
                        <span className='label'>{book.genre}</span>
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
