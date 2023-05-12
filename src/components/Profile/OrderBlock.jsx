import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import React from "react";

import { OrderItem } from "./OrderItem";

function OrderBlock(props) {
  const totalCount = props.pizzas.reduce((sum, obj) => sum + obj.count, 0);
  const date = Date.parse(props.createdAt);
  const dateReal = new Date(date);
  const formatDate = (date) => {
    var dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = "0" + yy;

    return `${dd}.${mm}.${yy}`;
  };

  const formatDateHour = (date) => {
    var hh = date.getHours();

    var mn = date.getMinutes();

    return `${hh}:${mn}`;
  };

  return (
    <>
      <Popup
        trigger={
          <Link to="">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
                paddingLeft: "1vw",
                paddingRight: "1vw",
              }}
            >
              <div className="pizza-block">
                <h4
                  className="pizza-block__title"
                  style={{
                    marginTop: 20,
                    marginBottom: 50,
                    width: 280,
                    fontSize: 20,
                  }}
                >
                  Заказ № {props.orderId}
                </h4>
                <h4
                  className="pizza-block__title"
                  style={{
                    marginBottom: 50,
                    width: 280,
                    fontSize: 18,
                    borderTop: "solid #aaa 2px",
                  }}
                >
                  Кол-во заказанных пицц: <br />
                  {totalCount} шт.
                  <br />
                </h4>
                <h4
                  className="pizza-block__title"
                  style={{
                    marginBottom: 50,
                    width: 280,
                    fontSize: 18,
                    borderBottom: "solid #aaa 2px",
                  }}
                >
                  Общая сумма: <br />
                  {props.totalPrice} ₽<br />
                </h4>
                <div className="pizza-block__bottom">
                  <div
                    style={{
                      marginLeft: 40,
                    }}
                  >
                    <span
                      className="pizza-block__title"
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Дата: <br />
                      {formatDate(dateReal)} <br />
                      {formatDateHour(dateReal)}
                    </span>
                  </div>
                  <div className="button button--outline button--add">
                    <span>Подробнее</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        }
      >
        {(close) => (
          <div className="modal" onClick={close}>
            <div
              className="modal__content"
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                height: 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ justifyContent: "center", display: "flex" }}>
                <h4
                  className="pizza-block__title"
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    width: 280,
                    fontSize: 30,
                    textAlign: "center",
                  }}
                >
                  Заказ № {props.orderId}
                </h4>
              </div>
              <div
                className="content__items"
                style={{ display: "table-column", overflow: "auto" }}
              >
                {props.pizzas.map((obj, index) => (
                  <OrderItem key={index} {...obj} />
                ))}
              </div>
              <div
                style={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "grid",
                }}
              ></div>
              <div
                style={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "grid",
                }}
              >
                <h4 className="modal__title">{props.title}</h4>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button className="button button--close" onClick={close}>
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default OrderBlock;
