import axios from "axios";
const api = axios.create({
  // baseURL: "https://betting-app-server.vercel.app/",
  baseURL: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export default api;
