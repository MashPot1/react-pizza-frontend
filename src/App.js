import "./scss/app.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home";
import Cart from "./components/Cart";
import NotFound from "./pages/NotFound";
import { fetchProfile, selectIsAuth } from "./redux/slices/authSlice";

function App() {
  // const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(fetchProfile());
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
