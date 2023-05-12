import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { selectIsAdmin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { createPizza } from "../../redux/slices/pizzasSlice";
import styles from "./PizzaCreateBlock.module.scss";

const PizzaCreateBlock = () => {
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      sizes: [0],
      prices: [0],
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      new URL(values.imageUrl);
    } catch (err) {
      return toast("Неверная ссылка на изображение!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "error",
      });
    }

    if (values.sizes.indexOf(0) !== -1 || values.prices.indexOf(0) !== -1) {
      return toast(
        "Не удалось создать пиццу, значения размера и цены не должны быть равны 0!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "error",
        }
      );
    }
    await dispatch(createPizza(values));
    window.location.reload();
  };

  return (
    <Popup
      trigger={
        <div className="pizza-create-block">
          <svg
            fill="#fe5f1e"
            height="80px"
            width="80px"
            version="1.1"
            id="Capa_1"
            viewBox="0 0 330 330"
            className="pizza-create-block__svg"
          >
            <g>
              <path d="M281.672,48.328C250.508,17.163,209.073,0,164.999,0C120.927,0,79.492,17.163,48.328,48.328   c-64.333,64.334-64.333,169.011,0,233.345C79.492,312.837,120.927,330,165,330c44.073,0,85.508-17.163,116.672-48.328   C346.005,217.339,346.005,112.661,281.672,48.328z M260.46,260.46C234.961,285.957,201.06,300,165,300   c-36.06,0-69.961-14.043-95.46-39.54c-52.636-52.637-52.636-138.282,0-190.919C95.039,44.042,128.94,30,164.999,30   c36.06,0,69.961,14.042,95.46,39.54C313.095,122.177,313.095,207.823,260.46,260.46z" />
              <path d="M254.999,150H180V75c0-8.284-6.716-15-15-15s-15,6.716-15,15v75H75c-8.284,0-15,6.716-15,15s6.716,15,15,15h75v75   c0,8.284,6.716,15,15,15s15-6.716,15-15v-75h74.999c8.284,0,15-6.716,15-15S263.284,150,254.999,150z" />
            </g>
          </svg>
        </div>
      }
    >
      {(close) => (
        <div className="modal" onClick={close}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "43vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "grid",
                }}
              >
                <textarea
                  className={styles.formInput}
                  helpertext={errors.imageUrl?.message}
                  {...register("imageUrl", { required: true })}
                  placeholder="Ссылка на изображение"
                />
                <div className="pizza-create-block__selector">
                  <div>
                    <ul>
                      {/*sizes*/}
                      {count
                        ? [...Array(count)].map((_, index) => (
                            <li key={index} className="size">
                              <input
                                className={styles.formInput}
                                placeholder="size"
                                {...register(`sizes.${index}`, {
                                  valueAsNumber: true,
                                  value: 0,
                                })}
                              >
                                {}
                              </input>
                            </li>
                          ))
                        : ""}
                    </ul>

                    <ul>
                      {/*prices*/}
                      {count
                        ? [...Array(count)].map((_, index) => (
                            <li key={index} className="price">
                              <input
                                className={styles.formInput}
                                placeholder="price"
                                {...register(`prices.${index}`, {
                                  valueAsNumber: true,
                                  value: 0,
                                })}
                              />
                            </li>
                          ))
                        : ""}
                    </ul>
                  </div>

                  {Boolean(count - 1) && (
                    <button
                      className={
                        count === 3
                          ? "pizza-create-block__remove-size last"
                          : "pizza-create-block__remove-size"
                      }
                      onClick={() => {
                        setCount((prev) => prev - 1);
                        unregister(`sizes.${count}`);
                        unregister(`prices.${count}`);
                      }}
                    >
                      <div>
                        <svg
                          fill="#fff"
                          width="40px"
                          height="40px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </button>
                  )}
                  {count < 3 ? (
                    <button
                      className="pizza-create-block__add-size"
                      onClick={() => {
                        setCount((prev) => prev + 1);
                      }}
                    >
                      <div>
                        <svg
                          fill="#fe5f1e"
                          height="40px"
                          width="40px"
                          version="1.1"
                          id="Capa_1"
                          viewBox="0 0 330 330"
                        >
                          <g>
                            <path d="M281.672,48.328C250.508,17.163,209.073,0,164.999,0C120.927,0,79.492,17.163,48.328,48.328   c-64.333,64.334-64.333,169.011,0,233.345C79.492,312.837,120.927,330,165,330c44.073,0,85.508-17.163,116.672-48.328   C346.005,217.339,346.005,112.661,281.672,48.328z M260.46,260.46C234.961,285.957,201.06,300,165,300   c-36.06,0-69.961-14.043-95.46-39.54c-52.636-52.637-52.636-138.282,0-190.919C95.039,44.042,128.94,30,164.999,30   c36.06,0,69.961,14.042,95.46,39.54C313.095,122.177,313.095,207.823,260.46,260.46z" />
                            <path d="M254.999,150H180V75c0-8.284-6.716-15-15-15s-15,6.716-15,15v75H75c-8.284,0-15,6.716-15,15s6.716,15,15,15h75v75   c0,8.284,6.716,15,15,15s15-6.716,15-15v-75h74.999c8.284,0,15-6.716,15-15S263.284,150,254.999,150z" />
                          </g>
                        </svg>
                      </div>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div
                style={{
                  alignItems: "center",
                  justifyItems: "center",
                  display: "grid",
                }}
              >
                <input
                  className={styles.formInput}
                  helpertext={errors.title?.message}
                  {...register("title", { required: true, minLength: 3 })}
                  placeholder="Название пиццы"
                />
                <textarea
                  className={styles.formInput}
                  helpertext={errors.description?.message}
                  {...register("description", { required: true, minLength: 3 })}
                  placeholder="Описание пиццы"
                  rows="15"
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className="button"
                    style={{
                      height: 50,
                      fontSize: 14,
                      marginRight: 10,
                      marginLeft: 10,
                      marginBottom: 1,
                    }}
                    type="submit"
                  >
                    Создать пиццу
                    <span style={{ fontSize: 16, fontWeight: 800 }}></span>
                  </button>
                  <button className="button button--close" onClick={close}>
                    Закрыть
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default PizzaCreateBlock;
