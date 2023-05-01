import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-pizza-backend.onrender.com",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
