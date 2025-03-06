//  Monthly 컴포넌트 - Monthly.jsx

import SubTop from "../module/SubTop";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function Monthly({ gnb1, gnb2 }) {
  const imgArr = [
    "997218055",
    "9968068289",
    "9968957386",
    "9977582909",
    "9977381086",
    "998349075",
    "9998411704",
    "9999300629",
    "9999627840",
  ];

  return (
    <>
      <SubTop gnb1={gnb1} gnb2={gnb2} />
      <div class="monthly-recommend">
        <div class="book-swiper">
          <Swiper
            loop={true}
            spaceBetween={20}
            breakpoints={{
              500: { slidesPerView: 1.5, centeredSlides: true },
              768: { slidesPerView: 3, centeredSlides: true },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
          >
            {imgArr.map((v,i) => (
              <SwiperSlide key={i}>
                <img
                  src={"../img/monthly/img-" + v + ".jpg"}
                  alt="도서 이미지"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Monthly;
