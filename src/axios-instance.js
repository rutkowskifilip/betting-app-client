import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const api = axios.create({
  // baseURL: "https://betting-app-server.vercel.app/",
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
export default api;
