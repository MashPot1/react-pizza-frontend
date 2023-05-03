import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, logout } from "../redux/slices/authSlice";

import logoSvg from "../assets/img/pizza-logo.svg";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const isMounted = React.useRef(false);
  const { data, totalPrice } = useSelector((state) => state.cart);

  const totalCount = data.reduce((sum, obj) => sum + obj.count, 0);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(data);
      localStorage.setItem("cart", json);
      localStorage.setItem("cartPrice", JSON.stringify(totalPrice));
    }
    isMounted.current = true;
  }, [totalPrice]);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={logoSvg} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
            </div>
          </div>
        </Link>
        <div className="buttons">
          <div className="header__cart">
            <Link to="./cart" className="button button--cart">
              <span>{totalPrice} ₽</span>
              <div className="button__delimiter"></div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{totalCount}</span>
            </Link>
          </div>
          {isAuth ? (
            <>
              <div className="header__profile">
                <Link to="./profile" className="button button--profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="40px"
                    height="40px"
                    viewBox="0 0 512 512"
                  >
                    <g
                      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                      fill="white"
                      stroke="none"
                    >
                      <path d="M2410 4334 c-14 -2 -59 -9 -100 -15 -644 -92 -1202 -563 -1410 -1188 -165 -494 -107 -1041 155 -1476 286 -474 765 -787 1309 -855 142 -18 434 -8 566 19 833 173 1429 897 1430 1736 1 996 -802 1794 -1795 1784 -71 -1 -141 -3 -155 -5z m285 -739 c32 -9 80 -27 107 -42 58 -31 147 -123 177 -181 116 -228 23 -501 -207 -610 -63 -30 -89 -36 -159 -40 -194 -10 -354 84 -436 258 -43 89 -50 215 -18 318 68 225 306 356 536 297z m355 -1003 c186 -62 336 -211 397 -396 26 -79 27 -89 31 -378 l4 -298 -897 0 -897 0 4 308 c3 305 4 308 30 382 56 152 160 270 303 341 132 65 160 68 585 66 354 -3 379 -4 440 -25z" />
                    </g>
                  </svg>
                </Link>
              </div>
              <button className="button button--logout" onClick={onClickLogout}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="button button--login">
                <span>Войти</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
