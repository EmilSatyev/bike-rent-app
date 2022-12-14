import React, { useRef } from "react";
import styles from "./CurrentOrders.module.scss";
import "./customCollapse.scss";
import cnBind from "classnames/bind";
import { Collapse } from "antd";
import OrderItemHeader from "../OrderItemHeader/OrderItemHeader";
import { SvgSelector } from "../../../helpers/svgSelector";
import OrderItemBody from "../OrderItemBody/OrderItemBody";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const { Panel } = Collapse;

const cx = cnBind.bind(styles);

const CurrentOrders = () => {
  const { state } = useLocation();
  const orderKeyRef = useRef(1);

  if (state) {
    orderKeyRef.current = state.orderId;
  }

  const { userInfo } = useSelector((state) => state.users);
  const orders = userInfo.orderIds;

  return (
    <SimpleBar style={{ maxHeight: "1000px" }}>
      <div className={styles.root}>
        {orders && orders.length ? (
          <>
            <div className={cx(styles.root__header)}>
              <div>Номер заказа</div>
              <div>Дата</div>
              <div>Стоимость</div>
              <div>Оплата</div>
              <div>Статус</div>
            </div>
            <Collapse
              className="custom-collapse"
              ghost
              accordion
              defaultActiveKey={orderKeyRef.current}
              expandIcon={() => <SvgSelector name="chevron" />}
            >
              {orders
                .filter((order) => order.status !== "completed")
                .reverse()
                .map((order) => (
                  <Panel
                    header={<OrderItemHeader {...order} />}
                    key={order._id}
                  >
                    <OrderItemBody {...order} />
                  </Panel>
                ))}
            </Collapse>
          </>
        ) : (
          <span>Нет заказов</span>
        )}
      </div>
    </SimpleBar>
  );
};

export default CurrentOrders;
