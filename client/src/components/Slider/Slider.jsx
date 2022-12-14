import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.scss";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

const Slider = ({ bikeImage }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src={bikeImage} alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65200.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65202.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65203.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65204.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65205.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65206.jpg" alt="Bike" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={bikeImage} alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65200.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65202.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65203.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65204.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65205.jpg" alt="Bike" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="static/65206.jpg" alt="Bike" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
