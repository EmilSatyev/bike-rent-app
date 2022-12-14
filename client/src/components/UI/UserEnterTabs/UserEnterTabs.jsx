import React, { useContext } from "react";
import "./UserEnterTabs.scss";
import { Tabs } from "antd";
import SignIn from "../Sign/SignIn/SignIn";
import SignUp from "../Sign/SignUp/SignUp";
import { StoreContext } from "../../../store/context/contextStore";

const UserEnterTabs = () => {
  const { activeTab, setActiveTab } = useContext(StoreContext);

  const onChange = (key) => {
    setActiveTab(key);
  };
  return (
    <Tabs
      className="tabs-custom"
      onChange={onChange}
      activeKey={activeTab}
      items={[
        {
          label: `Вход`,
          key: "1",
          children: <SignIn />,
        },
        {
          label: `Регистрация`,
          key: "2",
          children: <SignUp />,
        },
      ]}
    />
  );
};

export default UserEnterTabs;
