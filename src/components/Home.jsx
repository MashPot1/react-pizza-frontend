import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PizzaBlock from "./PizzaBlock/index";
import PizzaCreateBlock from "./PizzaCreateBlock/index";
import Skeleton from "./PizzaBlock/Skeleton";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import {
  selectIsAuth,
  selectIsAdmin,
  fetchProfile,
} from "../redux/slices/authSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);
  const isAdmin = useSelector(selectIsAdmin);
  const pizzas = useSelector((state) => state.pizzas);

  const isPizzasLoading = pizzas.status === "loading";
  React.useEffect(() => {
    dispatch(fetchPizzas());
    dispatch(fetchProfile());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top"></div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items" isloading="true">
            {isPizzasLoading
              ? [...Array(8)].map((_, index) => <Skeleton key={index} />)
              : pizzas.data.map((obj, index) => (
                  <PizzaBlock key={obj.pizzaId} {...obj} />
                ))}
            {isAdmin ? <PizzaCreateBlock /> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
