import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSignUp,
  fetchProfile,
  selectIsAuth,
} from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

import styles from "./Login.module.scss";

export const SignUpBlock = () => {
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
    const data = await dispatch(fetchSignUp(values));
    console.log(data);

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }

    if ("token" in data.payload) {
      return window.localStorage.setItem("token", data.payload.token);
    }
  };

  React.useEffect(() => {
    dispatch(fetchProfile());
    // eslint-disable-next-line
  }, []);
  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.root}>
        <h2 className={styles.title}>Регистрация</h2>
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
              //   type="password"
              helpertext={errors.password?.message}
              {...register("password", { required: "Укажите пароль" })}
              minLength={8}
            />
            <label className={styles.formLabel}>Пароль</label>
          </div>

          <div className={styles.buttons}>
            <button type="submit" className="button">
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpBlock;
