//  Monthly 컴포넌트 - Monthly.jsx

import SubTop from "../module/SubTop";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 모듈 CSS 불러오기 ////
import '../../css/page/monthly.scss';

// 데이터 불러오기 /////
import {monthlyData} from "../../js/data/monthly_data";
import { useState } from "react";

function Monthly({ gnb1, gnb2 }) {

  // 후크 상태변수 셋팅!
  // 배열 순번값 셋업
  const [seq, setSeq] = useState(0);
  const selData = monthlyData[seq];


  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div className="monthly-recommend">
        <div className="book-swiper">
          <Swiper
            loop={true}
            spaceBetween={20}
            breakpoints={{
              500: { slidesPerView: 1.5, centeredSlides: true },
              768: { slidesPerView: 3, centeredSlides: true },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
            // 슬라이드 변경시 실행코드구역 ////
            onSlideChange={(me)=>{
              console.log('Slide change!!!',me.realIndex);
              // 슬라이드 변경시 실제 순번을 
              // 데이터 순번 상태변수에 업데이트하기
              setSeq(me.realIndex);

            }}
          >
            {monthlyData.map((v,i) => (
              <SwiperSlide key={i}>
                <img
                  src={"../img/monthly/img-" + v.bImg + ".jpg"}
                  alt="도서 이미지"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="book-info">
              <div className="tit">{selData.bName}</div>
              <div className="author">{selData.bAuthor}</div>
              <div className="sub-info">
                {selData.bDescription}
              </div>
              <div className="borrow">
                <ul>
                  <li>
                    <a href="#">{selData.bStatus}</a>
                  </li>
                </ul>
              </div>
            </div>
    </>
  );
}

export default Monthly;
