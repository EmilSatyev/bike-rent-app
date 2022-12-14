import React, {useCallback, useContext, useEffect, useState} from "react";
import { SvgSelector } from "../../../helpers/svgSelector";
import { Dropdown, Modal } from "antd";
import UserEnterTabs from "../UserEnterTabs/UserEnterTabs";
import "./UserBtn.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/user/userSlice";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../store/context/contextStore";

export const ModalCloseContext = React.createContext(null);

const UserBtn = ({ customClass, mode }) => {
  const dispatch = useDispatch();

  const { isModalOpen, showModal, handleCancel } = useContext(StoreContext);
  const [items, setItems] = useState([]);

  const { userInfo } = useSelector((state) => state.users);

  const clickHandler = useCallback(() => {
    dispatch(logout());
  },[dispatch]);

  useEffect(() => {
    if (userInfo) {
      setItems([
        {
          label: (
            <Link key="0" to="user-profile">
              Личный кабинет
            </Link>
          ),
          key: "0",
        },
        {
          label: (
            <button key="1" onClick={clickHandler}>
              Выйти
            </button>
          ),
          key: "1",
        },
      ]);
    } else {
      setItems([
        {
          label: (
            <button key="0" onClick={showModal}>
              Войти
            </button>
          ),
          key: "0",
        },
        {
          label: (
            <button key="1" onClick={(e) => showModal(e, "2")}>
              Регистрация
            </button>
          ),
          key: "1",
        },
      ]);
    }
  }, [userInfo, showModal, clickHandler]);

  return (
    <>
      {mode === "drawer" ? (
        <div className="drawer-btns">{items.map((item) => item.label)}</div>
      ) : (
        <Dropdown
          trigger={["click"]}
          overlayClassName="dropdown-custom"
          placement="bottomRight"
          arrow={{
            pointAtCenter: true,
          }}
          menu={{
            items,
          }}
        >
          <button className={customClass}>
            <SvgSelector name="user-btn"></SvgSelector>
          </button>
        </Dropdown>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="modal-custom"
        closeIcon={<SvgSelector name="cross" />}
        width={640}
      >
        <UserEnterTabs />
      </Modal>
    </>
  );
};

export default UserBtn;
