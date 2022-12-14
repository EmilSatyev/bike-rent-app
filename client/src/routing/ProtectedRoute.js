import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import React, { useContext } from "react";
import { StoreContext } from "../store/context/contextStore";
import { Spin } from "antd";

const ProtectedRoute = () => {
  const { showModal } = useContext(StoreContext);
  const { userInfo, loading } = useSelector((state) => state.users);

  if (loading) {
    return <Spin />;
  }

  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return (
      <section className="unauthorized">
        <div className="container">
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
        </div>
      </section>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
