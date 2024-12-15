import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

API.defaults.headers.post["Content-Type"] = "application/json";

export default API;
