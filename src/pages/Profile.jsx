import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import OrderBlock from "../components/Profile/OrderBlock";
import OrdersEmpty from "../components/Profile/OrdersEmpty";
import Skeleton from "../components/Profile/Skeleton";
import { fetchOrders } from "../redux/slices/ordersSlice";
import { fetchProfile } from "../redux/slices/authSlice";

export const Profile = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const user = useSelector((state) => state.auth);

  const isOrdersLoading = orders.status === "loading";
  React.useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProfile());
    // eslint-disable-next-line
  }, []);
  if (user.status === "error") {
    return <Navigate to="/" />;
  }
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
