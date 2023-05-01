import React from "react";
import { Link } from "react-router-dom";

const OrdersEmpty = () => {
  return (
    <div className="content">
      <div className="container">
        <div className="content__top"></div>
        <h2 className="content__title">Мои заказы</h2>
        <div className="cart cart--empty">
          <h2>
            Вы ещё ничего не заказывали <icon>😕</icon>
          </h2>
          <p style={{ marginBottom: "10vh" }}>
            Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы
            заказать пиццу, перейди на главную страницу.
          </p>
          <Link to="/" className="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersEmpty;
