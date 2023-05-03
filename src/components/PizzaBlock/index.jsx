import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import React from "react";
import { selectIsAdmin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";

import { toast } from "react-toastify";

function PizzaBlock({ pizzaId, sizes, prices, imageUrl, title, description }) {
  const dispatch = useDispatch();
  // const isAdmin = useSelector(selectIsAdmin);

  // console.log(isAdmin);
  const [activeSize, setActiveSize] = React.useState(0);
  // const [isEdit, setIsEdit] = React.useState(false);

  const onClickAdd = () => {
    const item = {
      pizzaId,
      title,
      size: sizes[activeSize],
      price: prices[activeSize],
      imageUrl,
    };
    dispatch(addItem(item));
    toast(`Добавлено ${title} ${sizes[activeSize]} за ${prices[activeSize]} `, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="pizza-block">
          <Popup
            trigger={
              <Link to="">
                <img
                  className="pizza-block__image"
                  src={imageUrl}
                  alt="Pizza"
                />
                <h4 className="pizza-block__title">{title}</h4>
                <div className="pizza-block__bottom">
                  <div className="pizza-block__price"> От {prices[0]} ₽</div>
                  <div className="button button--outline button--add">
                    <span>Подробнее</span>
                  </div>
                </div>
              </Link>
            }
          >
            {(close) => (
              <div className="modal" onClick={close}>
                <div
                  className="modal__content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{
                      alignItems: "center",
                      justifyItems: "center",
                      display: "grid",
                    }}
                  >
                    <img className="modal__image" src={imageUrl} alt="Pizza" />
                    <div className="pizza-block__selector">
                      <ul>
                        {sizes.map((obj, index) => (
                          <li
                            key={index}
                            onClick={() => setActiveSize(index)}
                            className={activeSize === index ? "active" : ""}
                          >
                            {obj} см.
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div
                    style={{
                      alignItems: "center",
                      justifyItems: "center",
                      display: "grid",
                    }}
                  >
                    <h4 className="modal__title">{title}</h4>
                    <h4 className="modal__description">{description}</h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* {isAdmin ? (
                  <button
                    className="button button--profile button--outline"
                    style={{ fill: "white" }}
                    onClick={() => setIsEdit(true)}
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3862 7.28073L16.9766 3.6903C17.4186 3.24831 18.0181 3 18.6432 3C19.9448 3 21 4.05519 21 5.35684C21 5.98192 20.7517 6.58139 20.3097 7.02338L16.7193 10.6138C15.1584 12.1747 13.2026 13.282 11.0611 13.8174L10.3671 13.9909C10.1509 14.045 9.95503 13.8491 10.0091 13.6329L10.1826 12.9389C10.718 10.7974 11.8253 8.84163 13.3862 7.28073Z"
                        fill="#363853"
                        fill-opacity="0.15"
                      />
                      <path
                        d="M20.4445 6.88859C18.7779 7.4441 16.5559 5.22205 17.1114 3.55551M16.9766 3.6903L13.3862 7.28073C11.8253 8.84163 10.718 10.7974 10.1826 12.9389L10.0091 13.6329C9.95503 13.8491 10.1509 14.045 10.3671 13.9909L11.0611 13.8174C13.2026 13.282 15.1584 12.1747 16.7193 10.6138L20.3097 7.02338C20.7517 6.58139 21 5.98192 21 5.35684C21 4.05519 19.9448 3 18.6432 3C18.0181 3 17.4186 3.24831 16.9766 3.6903Z"
                        stroke="#363853"
                        stroke-width="1.5"
                      />
                      <path
                        d="M12 3C10.9767 3 9.95334 3.11763 8.95043 3.35288C6.17301 4.00437 4.00437 6.17301 3.35288 8.95043C2.88237 10.9563 2.88237 13.0437 3.35288 15.0496C4.00437 17.827 6.17301 19.9956 8.95044 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C20.8824 14.0466 21 13.0233 21 12"
                        stroke="#363853"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                ) : (
                  ""
                )} */}
                      <button
                        className="button"
                        style={{
                          height: 50,
                          fontSize: 14,
                          marginRight: 10,
                          marginLeft: 10,
                          marginBottom: 1,
                        }}
                        onClick={() => onClickAdd()}
                      >
                        Добавить в корзину за{" "}
                        <span style={{ fontSize: 16, fontWeight: 800 }}>
                          {prices[activeSize]}
                        </span>{" "}
                        ₽
                      </button>
                      <button className="button button--close" onClick={close}>
                        Закрыть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </>
  );
}

export default PizzaBlock;
