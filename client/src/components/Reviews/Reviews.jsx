import React from "react";
import styles from "./Reviews.module.scss";
import cnBind from "classnames/bind";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import "./styles.scss";
import { SvgSelector } from "../../helpers/svgSelector";

const cx = cnBind.bind(styles);

const Reviews = () => {
  return (
    <section className={styles.root}>
      <div className="container appendix">
        <h2 className={cx("title", "title--h2", styles.root__title)}>Отзывы</h2>
        <Swiper
          className="reviews-slider"
          slidesPerView={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          <SwiperSlide>
            <div>
              <p>
                Безусловно, семантический разбор внешних противодействий
                способствует повышению качества вывода текущих активов.
                противодействий способствует повышению качества вывода текущих
                активов.
              </p>
              <div className="author">
                <SvgSelector name="review-quote" />
                <span>Александр Н.</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p>
                Безусловно, семантический разбор внешних противодействий
                способствует повышению качества вывода текущих активов.
                противодействий способствует повышению качества вывода текущих
                активов.
              </p>
              <div className="author">
                <SvgSelector name="review-quote" />
                <span>Александр Н.</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p>
                Безусловно, семантический разбор внешних противодействий
                способствует повышению качества вывода текущих активов.
                противодействий способствует повышению качества вывода текущих
                активов.
              </p>
              <div className="author">
                <SvgSelector name="review-quote" />
                <span>Александр Н.</span>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <p>
                Безусловно, семантический разбор внешних противодействий
                способствует повышению качества вывода текущих активов.
                противодействий способствует повышению качества вывода текущих
                активов.
              </p>
              <div className="author">
                <SvgSelector name="review-quote" />
                <span>Александр Н.</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
