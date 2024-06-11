import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export const updateToken = (newToken) => {
  Cookies.set("token", newToken, {
    expires: 1 / 24,
    secure: true,
    sameSite: "Strict",
  });
  api.defaults.headers.Authorization = `Bearer ${newToken}`;
};

export default api;
