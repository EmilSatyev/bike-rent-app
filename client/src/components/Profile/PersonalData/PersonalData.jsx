import React, { useEffect, useState } from "react";
import styles from "./PersonalData.module.scss";
import cnBind from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { SvgSelector } from "../../../helpers/svgSelector";
import { updateUserDetails } from "../../../store/services/userService";
import {useNavigate} from "react-router-dom";

const cx = cnBind.bind(styles);

const PersonalData = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo, error } = useSelector((state) => state.users);
  const { id, name, email, phone, address } = userInfo;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && isEdit) {
      form.setFieldValue("email", email);
      form.setFieldValue("name", name);
      form.setFieldValue("phone", phone);
      form.setFieldValue("address", address);
    }
  }, [isEdit, name, email, phone, address, form, userInfo]);

  const onFinish = async (formObj) => {
    for (let key in formObj) {
      if (!formObj[key]) delete formObj[key];
    }
    delete formObj.confirmPassword;
    if (formObj.email === userInfo.email) {
      delete formObj.email;
    }

    await dispatch(updateUserDetails({ id, ...formObj }));
    setIsEdit(false);
    navigate("/user-profile", { state: { tabId: 3 } });
  };
  const handleClick = () => {
    setIsEdit(true);
  };

  return (
    <div className={styles.root}>
      {isEdit ? (
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          layout="vertical"
          className="edit-form"
        >
          <Form.Item name="name" label="Имя">
            <Input autoComplete="name" placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: "email",
                message: "Неправильный E-mail",
              },
              {
                required: true,
                message: "Пожалуйста введите E-mail",
              },
            ]}
          >
            <Input autoComplete="email" placeholder="Введите E-mail" />
          </Form.Item>
          <Form.Item
            className="edit-password"
            label="Новый пароль"
            name="password"
            rules={[
              {
                validator: (_, value) => {
                  if (!value) {
                    return Promise.resolve();
                  }
                  if (/[^0-9a-zA-Z!@#$%^&*-]/.test(value) || value.length < 6) {
                    return Promise.reject(new Error("Некорректный пароль"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? (
                  <div>
                    <SvgSelector name="eye" />
                  </div>
                ) : (
                  <div>
                    <SvgSelector name="eye-crossed" />
                  </div>
                )
              }
              autoComplete="new-password"
              placeholder="Введите пароль"
            />
          </Form.Item>
          <Form.Item name="phone" label="Номер телефона">
            <Input placeholder="Введите номер телефона" autoComplete="tel" />
          </Form.Item>
          <Form.Item name="address" label="Адрес">
            <Input placeholder="Введите адрес" autoComplete="tel" />
          </Form.Item>
          <Form.Item
            label="Подтвердите пароль"
            dependencies={["password"]}
            name="confirmPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (/[^0-9a-zA-Z!@#$%^&*-]/.test(value)) {
                    return Promise.reject(new Error("Некорректный пароль"));
                  }
                  if (getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? (
                  <div>
                    <SvgSelector name="eye" />
                  </div>
                ) : (
                  <div>
                    <SvgSelector name="eye-crossed" />
                  </div>
                )
              }
              autoComplete="on"
              placeholder="Введите пароль"
            />
          </Form.Item>
          <div className={styles.root__btns}>
            <Button
              className={cx("btn", "btn--fixedWidth", styles.root__btn)}
              htmlType="submit"
            >
              Сохранить
            </Button>
            <button
              onClick={() => setIsEdit(false)}
              className={cx("btn", "btn--fixedWidth", "btn--outlined")}
            >
              Отменить
            </button>
          </div>
          {error ? <div className="user-error">{error}</div> : null}
        </Form>
      ) : (
        <>
          <div className={styles.root__grid}>
            <div className={styles.root__item}>
              <span className={styles.root__label}>Имя</span>
              <span className={styles.root__value}>{name}</span>
            </div>
            <div className={styles.root__item}>
              <span className={styles.root__label}>E-mail</span>
              <span className={styles.root__value}>{email}</span>
            </div>
            <div className={cx(styles.root__item, styles.root__password)}>
              <span className={styles.root__label}>Пароль</span>
              <span className={styles.root__value}>*********</span>
            </div>
            <div className={styles.root__item}>
              <span className={styles.root__label}>Номер телефона</span>
              <span className={styles.root__value}>{phone}</span>
            </div>
            <div className={styles.root__item}>
              <span className={styles.root__label}>Адрес доставки</span>
              <span className={styles.root__value}>
                {address ? address : "Адреса нет"}
              </span>
            </div>
          </div>
          <button
            onClick={handleClick}
            className={cx("btn", "btn--fixedWidth")}
          >
            Редактировать
          </button>
        </>
      )}
    </div>
  );
};

export default PersonalData;
