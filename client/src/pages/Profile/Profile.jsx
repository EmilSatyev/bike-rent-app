import React, { useState } from "react";
import styles from "./Profile.module.scss";
import cnBind from "classnames/bind";
import { Dropdown, Tabs } from "antd";
import CurrentOrders from "../../components/Profile/CurrentOrders/CurrentOrders";
import { useLocation } from "react-router-dom";
import CompletedOrders from "../../components/Profile/CompletedOrders/CompletedOrders";
import PersonalData from "../../components/Profile/PersonalData/PersonalData";
import Helmet from "../../components/Helmet/Helmet";
import { SvgSelector } from "../../helpers/svgSelector";

const cx = cnBind.bind(styles);

const items = [
  {
    key: "1",
    label: "Текущие заказы",
  },
  {
    key: "2",
    label: "История заказов",
  },
  {
    key: "3",
    label: "Личные данные",
  },
];

const Profile = () => {
  const { state } = useLocation();
  const [tabKey, setTabKey] = useState(state?.tabId || 1);
  const [tabLabel, setTabLabel] = useState("Текущие заказы");

  const handleChange = (active) => {
    setTabKey(+active);
    setTabLabel(items[+active - 1].label);
  };

  return (
    <Helmet title="Личный кабинет">
      <section className={styles.root}>
        <div className={cx("container")}>
          <h1 className={cx("title", "title--h1", styles.root__title)}>
            Личный кабинет
          </h1>
          <Dropdown
            overlayClassName="profile-dropdown"
            className="profile-dropdown-btn"
            menu={{
              items,
              onClick: (e) => handleChange(e.key),
            }}
            trigger={["click"]}
          >
            <button>
              {tabLabel}
              <span>
                <SvgSelector name="chevron" />
              </span>
            </button>
          </Dropdown>
          <Tabs
            activeKey={tabKey}
            onChange={handleChange}
            className="tabs-custom profile-tabs"
            items={[
              {
                label: "Текущие заказы",
                key: 1,
                children: <CurrentOrders />,
              },
              {
                label: "История заказов",
                key: 2,
                children: <CompletedOrders />,
              },
              {
                label: "Личные данные",
                key: 3,
                children: <PersonalData />,
              },
            ]}
          />
        </div>
      </section>
    </Helmet>
  );
};

export default Profile;
