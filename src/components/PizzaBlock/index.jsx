import Popup from "reactjs-popup";
import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { selectIsAdmin } from "../../redux/slices/authSlice";
import {
  fetchDeletePizza,
  updatePizza,
  fetchPizzas,
} from "../../redux/slices/pizzasSlice";

import { addItem } from "../../redux/slices/cartSlice";
import styles from "../PizzaCreateBlock/PizzaCreateBlock.module.scss";

function PizzaBlock({ pizzaId, sizes, prices, imageUrl, title, description }) {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const [count, setCount] = React.useState(sizes.length);
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      pizzaId: pizzaId,
      imageUrl: imageUrl,
      title: title,
      description: description,
      sizes: sizes,
      prices: prices,
    },
    mode: "onChange",
  });

  const [activeSize, setActiveSize] = React.useState(0);
  const [isEdit, setIsEdit] = React.useState(false);

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
    setIsEdit(false);
    dispatch(updatePizza(values));
    dispatch(fetchPizzas());
  };

  const deletePizza = () => {
    if (window.confirm(`Вы действительно хотите удалить: ${title}?`)) {
      dispatch(fetchDeletePizza(pizzaId));
      alert("Пицца успешно удалена!");
    }
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
                  {isEdit ? (
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
                          {...register("title", {
                            required: true,
                            minLength: 3,
                          })}
                          placeholder="Название пиццы"
                        />
                        <textarea
                          className={styles.formInput}
                          helpertext={errors.description?.message}
                          {...register("description", {
                            required: true,
                            minLength: 3,
                          })}
                          placeholder="Описание пиццы"
                          rows="15"
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
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
                            Сохранить
                            <span
                              style={{ fontSize: 16, fontWeight: 800 }}
                            ></span>
                          </button>
                          <button
                            className="button button--close"
                            style={{ marginRight: "10px" }}
                            onClick={() => deletePizza()}
                          >
                            Удалить
                          </button>
                          <button
                            className="button button--outline"
                            onClick={() => setIsEdit(false)}
                          >
                            Отменить
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div
                        style={{
                          alignItems: "center",
                          justifyItems: "center",
                          display: "grid",
                        }}
                      >
                        <img
                          className="modal__image"
                          src={imageUrl}
                          alt="Pizza"
                        />
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
                          {isAdmin ? (
                            <button
                              className="button button--profile button--outline"
                              style={{
                                fill: "white",
                                justifyContent: "center",
                              }}
                              onClick={() => setIsEdit(true)}
                            >
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 363.818 363.818"
                              >
                                <g>
                                  <g>
                                    <path d="M358.872,0.841c-3.196-1.538-7.014-0.931-9.572,1.526c-19.515,18.728-53.141,46.415-102.511,71.961 c-2.159,1.118-3.737,3.106-4.333,5.463c-4.028,15.908-11.933,33.271-23.492,51.607l-4.705,7.462l8.772-38.205 c0.715-3.115-0.378-6.368-2.828-8.42c-2.451-2.052-5.846-2.556-8.786-1.303l-1.015,0.428 C110.79,133.291,81.352,198.24,72.67,233.22c-3.013,12.141-4.516,24.163-4.465,35.738c0.02,4.466,0.272,8.722,0.75,12.705 l-66.39,67.703c-3.211,3.273-3.246,8.505-0.078,11.822c1.667,1.745,3.904,2.629,6.149,2.629c2.02,0,4.045-0.717,5.664-2.164 l182.428-163.851c0.896,0.059-103.874,109.806-102.925,109.806c14.22,0,33.863-6.555,56.804-18.95 c30.935-16.717,65.508-42.37,99.979-74.185c2.832-2.612,3.551-6.805,1.753-10.213c-1.798-3.407-5.662-5.181-9.42-4.315 l-21.363,4.904l7.465-4.706c20.835-13.136,40.313-21.511,57.891-24.897c1.901-0.367,3.622-1.372,4.875-2.849 c41.348-48.75,58.853-96.919,66.256-128.743c2.69-11.567,4.579-23.134,5.607-34.38C363.972,5.742,362.069,2.379,358.872,0.841z" />
                                  </g>
                                </g>
                              </svg>
                            </button>
                          ) : (
                            ""
                          )}
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
                          <button
                            className="button button--close"
                            onClick={close}
                          >
                            Закрыть
                          </button>
                        </div>
                      </div>
                    </>
                  )}
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
