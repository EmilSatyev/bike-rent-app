import React, { useContext, useEffect } from "react";
import "../Sign.scss";
import { Button, Form, Input } from "antd";
import { SvgSelector } from "../../../../helpers/svgSelector";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../../store/services/userService";
import { StoreContext } from "../../../../store/context/contextStore";

const SignIn = () => {
  const { setIsModalOpen } = useContext(StoreContext);

  const dispatch = useDispatch();
  const onFinish = (formObj) => {
    dispatch(userLogin(formObj));
  };
  const { error, userToken } = useSelector((state) => state.users);

  useEffect(() => {
    if (userToken) {
      setIsModalOpen(false);
    }
  }, [userToken, setIsModalOpen]);

  return (
    <Form
      onFinish={onFinish}
      name="signin"
      layout="vertical"
      className={"sign-form"}
    >
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
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите пароль" }]}
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
          autoComplete="current-password"
          placeholder="Введите пароль"
        />
      </Form.Item>
      <Button className="btn" htmlType="submit">
        Войти
      </Button>
      {error ? <div className="user-error">{error}</div> : null}
    </Form>
  );
};

export default SignIn;
