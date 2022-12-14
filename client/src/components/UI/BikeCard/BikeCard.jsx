import React, { useEffect, useState } from "react";
import styles from "./BikeCard.module.scss";
import cnBind from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { addToSelected } from "../../../store/order/orderSlice";
import { Modal } from "antd";
import { SvgSelector } from "../../../helpers/svgSelector";
import ModalBike from "../ModalBike/ModalBike";

const cx = cnBind.bind(styles);

const BikeCard = ({ data }) => {
  const { _id, name, sizesId, typeId, bikeImage, price, brandId, orderIds } =
    data;

  const { dateStart, dateEnd, cities } = useSelector((state) => state.filters);
  const { selectedBikes } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (disabled) {
      setButtonText("Занят");
    } else if (selected) {
      setButtonText("Выбрано");
    } else {
      setButtonText("Выбрать");
    }
  }, [disabled, selected]);
  useEffect(() => {
    if (orderIds.length) {
      orderIds.forEach((order) => {
        const orderCity = order.cityId.value;
        const orderDateStart = new Date(order.dateStart).getTime();
        const orderDateEnd = new Date(order.dateEnd).getTime();

        if (
          orderCity === cities &&
          ((dateStart >= orderDateStart && dateStart < orderDateEnd) ||
            (dateEnd >= orderDateStart && dateEnd < orderDateEnd))
        ) {
          setDisabled(true);
        }
      });
    }
  }, [cities, dateEnd, dateStart, orderIds]);
  useEffect(() => {
    const selectedIds = selectedBikes.map((bike) => bike._id);
    if (selectedIds.includes(_id)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [_id, selectedBikes]);

  const handleClick = (bikes) => {
    const days = (dateEnd - dateStart) / 86400000;
    dispatch(addToSelected({ bikes, days }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={cx(styles.root, { disabled })}>
        <div className={styles.root__header}>
          <span>{sizesId.label}</span>
          <span className={styles.root__brand}>{brandId.value}</span>
        </div>
        <div className={styles.root__image}>
          <img src={bikeImage} alt={name} />
        </div>
        <h5 className={cx(styles.root__title, "title")}>
          <span>{typeId.label}</span>
          <button onClick={showModal} className={styles.root__btn}>
            {name}
          </button>
        </h5>
        <span className={styles.root__price}>{price} руб/день</span>
        <button
          onMouseOver={selected ? () => setButtonText("Отменить выбор") : null}
          onMouseOut={selected ? () => setButtonText("Выбрано") : null}
          onClick={() => handleClick(data)}
          className={cx("btn", "btn--small", {
            "btn--disabled": disabled,
            "btn--outlined": !selected,
          })}
        >
          {buttonText}
        </button>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="modal-custom modal-bike"
        closeIcon={<SvgSelector name="cross" />}
      >
        <ModalBike {...data} />
      </Modal>
    </>
  );
};

export default BikeCard;
