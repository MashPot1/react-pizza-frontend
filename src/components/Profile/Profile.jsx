import React from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderBlock from "./OrderBlock";
import OrdersEmpty from "./OrdersEmpty";
import Skeleton from "./Skeleton";
import { fetchOrders } from "../../redux/slices/ordersSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const isOrdersLoading = orders.status === "loading";
  React.useEffect(() => {
    dispatch(fetchOrders());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top"></div>
          <h2 className="content__title">Мои заказы</h2>
          {isOrdersLoading ? (
            <div className="content__items">
              {[...Array(8)].map((_, index) => (
                <Skeleton key={index} />
              ))}
            </div>
          ) : !orders.data.length ? (
            <OrdersEmpty />
          ) : (
            <div className="content__items">
              {orders.data.map((obj, index) => (
                <OrderBlock key={index} {...obj} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
