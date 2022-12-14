import React from "react";
import styles from "../CurrentOrders/CurrentOrders.module.scss";
import "../CurrentOrders/customCollapse.scss";
import cnBind from "classnames/bind";
import { useSelector } from "react-redux";
import { Collapse } from "antd";
import { SvgSelector } from "../../../helpers/svgSelector";
import OrderItemHeader from "../OrderItemHeader/OrderItemHeader";
import OrderItemBody from "../OrderItemBody/OrderItemBody";
import SimpleBar from "simplebar-react";

const { Panel } = Collapse;

const cx = cnBind.bind(styles);

const CompletedOrders = () => {
  const { userInfo } = useSelector((state) => state.users);
  const orders = userInfo.orderIds.filter(
    (order) => order.status === "completed"
  );

  return (
    <SimpleBar style={{ maxHeight: "1000px" }}>
      <div className={styles.root}>
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
                expandIcon={() => <SvgSelector name="chevron" />}
              >
                {orders
                  .filter((order) => order.status === "completed")
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
      </div>
    </SimpleBar>
  );
};

export default CompletedOrders;
