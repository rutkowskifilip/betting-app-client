import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const api = axios.create({
  // baseURL: "https://betting-app-server.vercel.app/",
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://192.168.0.141:4000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const updateToken = (newToken) => {
  Cookies.set("token", newToken);
  api.defaults.headers.Authorization = `Bearer ${newToken}`;
};

export default api;
