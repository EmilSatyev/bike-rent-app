import React from "react";
import styles from "./Contacts.module.scss";
import cnBind from "classnames/bind";
import Helmet from "../../components/Helmet/Helmet";
import { Button, Checkbox, Form, Input } from "antd";
import { Map, Placemark, FullscreenControl } from "@pbe/react-yandex-maps";

const cx = cnBind.bind(styles);

const Contacts = () => {
  const [form] = Form.useForm();

  const onFinish = async (formObj) => {
    console.log(formObj);
  };

  return (
    <Helmet title="Контакты">
      <section className={styles.root}>
        <div className="container">
          <h1 className={cx("title", "title--h1", styles.root__title)}>
            Контакты
          </h1>
          <div className={styles.root__top}>
            <div className={styles.root__col}>
              <div className={styles.root__item}>
                <span className={styles.root__label}>Номер телефона</span>
                <span>8 (800) 555-35-35</span>
              </div>
              <div className={styles.root__item}>
                <span className={styles.root__label}>E-mail</span>
                <span>bike@mail.ru</span>
              </div>
              <div className={styles.root__item}>
                <span className={styles.root__label}>Адрес</span>
                <span>г. Москва, Новослободская 21</span>
              </div>
            </div>
            <div className={styles.root__col}>
              <span className={styles.root__label}>Оставить заявку</span>
              <Form
                form={form}
                name="feedback"
                onFinish={onFinish}
                layout="vertical"
                className={"sign-form feedback-form"}
              >
                <h3
                  className={cx("title", "title--h3", styles.root__sub_title)}
                >
                  Остались вопросы? Свяжитесь с нами
                </h3>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста введите имя",
                    },
                  ]}
                >
                  <Input autoComplete="name" placeholder="Введите имя*" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Пожалуйста введите номер телефона",
                    },
                  ]}
                >
                  <Input
                    placeholder="Введите номер телефона*"
                    autoComplete="tel"
                  />
                </Form.Item>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error("Необходимо согласие")),
                    },
                  ]}
                >
                  <Checkbox>Согласие на обработку персональных данных</Checkbox>
                </Form.Item>
                <Button className="btn" htmlType="submit">
                  Отправить
                </Button>
              </Form>
            </div>
          </div>
          <Map
            className={styles.root__map}
            defaultState={{
              center: [55.78103043576309, 37.598947757602666],
              zoom: 17,
              controls: [],
            }}
            width="100%"
            height="100%"
          >
            <Placemark geometry={[55.78103043576309, 37.598947757602666]} />
            <FullscreenControl />
          </Map>
          {/*<Map/>*/}
        </div>
      </section>
    </Helmet>
  );
};

export default Contacts;
