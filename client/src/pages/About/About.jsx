import React from "react";
import styles from "./About.module.scss";
import cnBind from "classnames/bind";
import Helmet from "../../components/Helmet/Helmet";
import Reviews from "../../components/Reviews/Reviews";

const cx = cnBind.bind(styles);

const About = () => {
  return (
    <Helmet title="О нас">
      <section className={styles.root}>
        <div className={cx("container")}>
          <h1 className={cx("title", "title--h1", styles.root__title)}>
            О нас
          </h1>
          <div className={cx(styles.root__content)}>
            <div className={styles.root__left}>
              <p className="text">
                Цель проекта городского общественного велопроката&nbsp;&mdash;
                создать альтернативу автомобилю и&nbsp;общественному транспорту,
                предоставить жителям города и&nbsp;туристам доступный транспорт
                для кратковременных поездок.
              </p>
              <p className="text">
                Нашим пользователям не&nbsp;нужно покупать и&nbsp;хранить
                собственные велосипеды, стоять в&nbsp;пробках и&nbsp;платить
                за&nbsp;парковку. Не&nbsp;нужно думать о&nbsp;техническом
                обслуживании. Взять и&nbsp;сдать велосипед можно за&nbsp;минуту,
                без очередей и&nbsp;залогов.
              </p>
            </div>
            <div className={styles.root__image} />
          </div>
        </div>
      </section>
      <Reviews />
    </Helmet>
  );
};

export default About;
