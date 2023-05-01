import React from "react";
// import { CartItem as CartItemType } from "../redux/cart/types";

// type CartItemProps = {
//   id: string;
//   title: string;
//   size: number;
//   price: number;
//   count: number;
//   imageUrl: string;
// };

export const OrderItem = ({ title, size, price, count, imageUrl }) => {
  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info" style={{ textAlign: "center" }}>
        <h3>{title}</h3>
      </div>
      <div className="cart__item-info" style={{ textAlign: "center" }}>
        <h3>{size} см.</h3>
      </div>
      <div className="cart__item-count">
        <b>{count} шт.</b>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
    </div>
  );
};
