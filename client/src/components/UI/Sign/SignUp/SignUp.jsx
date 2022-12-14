import React, { useEffect } from "react";
import "../Sign.scss";
import { Button, Checkbox, Form, Input } from "antd";
import { SvgSelector } from "../../../../helpers/svgSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  userLogin,
} from "../../../../store/services/userService";
import { StoreContext } from "../../../../store/context/contextStore";

const SignUp = () => {
  const { setIsModalOpen } = React.useContext(StoreContext);

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.users);

  const onFinish = async (formObj) => {
    await dispatch(registerUser(formObj));
  };

  useEffect(() => {
    if (success) {
      const { email, password } = form.getFieldsValue();
      dispatch(userLogin({ email, password }));
      setIsModalOpen(false);
    }
  }, [success, dispatch, form, setIsModalOpen]);

  return (
    <Form
      form={form}
      name="signup"
      onFinish={onFinish}
      layout="vertical"
      className={"sign-form"}
    >
      <Form.Item
        name="name"
        label="Имя"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите имя",
          },
        ]}
      >
        <Input autoComplete="name" placeholder="Введите имя" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Номер телефона"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите номер телефона",
          },
        ]}
      >
        <Input placeholder="Введите номер телефона" autoComplete="tel" />
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
        Зарегистрироваться
      </Button>
      {error ? <div className="user-error">{error}</div> : null}
    </Form>
  );
};

export default SignUp;
