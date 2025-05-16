
import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // or your backend URL
  withCredentials: true, // optional, if you need cookies or auth
});

export default apiClient;
