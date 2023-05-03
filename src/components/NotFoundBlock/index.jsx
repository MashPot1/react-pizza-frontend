import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
      <Link to="/" className="button button--black" style={{ marginTop: 20 }}>
        <span style={{ fontSize: 18 }}>Вернуться назад</span>
      </Link>
    </div>
  );
};
