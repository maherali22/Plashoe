import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  
)