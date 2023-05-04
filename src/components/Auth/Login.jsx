import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/authSlice";
import { Navigate, Link } from "react-router-dom";

import styles from "./Login.module.scss";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    console.log(Boolean(data.payload));
    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      return window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.root}>
        <h2 className={styles.title}>Вход в аккаунт</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className={styles.formInput}
              type="email"
              helpertext={errors.email?.message}
              {...register("email")}
            />
            <label className={styles.formLabel}>Email</label>
          </div>

          <div>
            <input
              className={styles.formInput}
              type="password"
              helpertext={errors.password?.message}
              {...register("password", { required: "Укажите пароль" })}
            />
            <label className={styles.formLabel}>Пароль</label>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className="button">
              Войти
            </button>
          </div>
        </form>

        <h3 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
          У вас нет аккаунта?
        </h3>

        <Link to="/signup" className="button button--login">
          <span>Зарегистрироваться</span>
        </Link>
      </div>
    </>
  );
};

export default Login;
