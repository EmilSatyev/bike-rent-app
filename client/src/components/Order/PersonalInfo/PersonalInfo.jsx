import React, { useContext } from "react";
import "./PersonalInfo.scss";
import cn from "classnames";
import { Button, Form, Input, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../store/order/orderSlice";
import { StoreContext } from "../../../store/context/contextStore";

const format = "HH:mm";

const PersonalInfo = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { showModal } = useContext(StoreContext);
  const { dateStart, dateEnd, cities } = useSelector((state) => state.filters);
  const { userInfo } = useSelector((state) => state.users);

  const { selectedBikes, totalPrice, days } = useSelector(
    (state) => state.orders
  );

  const selectHandler = (time) => {
    form.setFieldValue("delivery-time", time);
  };
  const disabledTime = () => {
    return {
      disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23, 24],
    };
  };
  const onFinish = () => {
    const orderObj = {
      userId: userInfo.id,
      dateStart,
      dateEnd,
      city: cities,
      bikesId: selectedBikes.map((bike) => bike._id),
      totalPrice,
      days,
    };
    dispatch(createOrder(orderObj));
  };

  if (userInfo) {
    form.setFieldValue("email", userInfo.email);
    form.setFieldValue("name", userInfo.name);
    form.setFieldValue("address", userInfo.address);
    form.setFieldValue("phone", userInfo.phone);
  }

  return (
    <section>
      <div className={cn("container", "appendix")}>
        {userInfo ? (
          <Form
            onFinish={onFinish}
            className="personal-info-form"
            form={form}
            name="order"
            layout="vertical"
            fields={[
              {
                name: "delivery-time",
                value: moment("12:00", format),
              },
            ]}
          >
            <div>
              <Form.Item
                disabled
                label="Контактные данные"
                name="email"
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
                <Input
                  autoComplete="email"
                  disabled={userInfo}
                  placeholder="Введите E-mail"
                />
              </Form.Item>
              <Form.Item
                name="name"
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
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите номер телефона",
                  },
                ]}
              >
                <Input
                  placeholder="Введите номер телефона"
                  autoComplete="tel"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Адрес доставки"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите адрес",
                  },
                ]}
              >
                <Input
                  autoComplete="street-address"
                  placeholder="Введите адрес"
                />
              </Form.Item>
              <Form.Item
                label="Время доставки"
                name="delivery-time"
                rules={[
                  {
                    required: true,
                    message: "Пожалуйста введите время доставки",
                  },
                ]}
              >
                <TimePicker
                  allowClear={false}
                  disabledTime={disabledTime}
                  onSelect={selectHandler}
                  minuteStep={15}
                  format={format}
                  footer={null}
                  suffixIcon={false}
                />
              </Form.Item>
            </div>
            <div className="btn-wrap">
              <Button className="btn" htmlType="submit">
                Забронировать
              </Button>
            </div>
          </Form>
        ) : (
          <h2 className="title title--h2 personal-info-caution">
            Для продолжения{" "}
            <button onClick={showModal} className="link-btn">
              войдите
            </button>{" "}
            или{" "}
            <button onClick={(e) => showModal(e, "2")} className="link-btn">
              зарегистрируйтесь
            </button>
          </h2>
        )}
      </div>
    </section>
  );
};

export default PersonalInfo;
