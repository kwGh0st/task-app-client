import axios from "axios";

console.log("API base URL:", import.meta.env.VITE_REACT_APP_API_BASE_URL);

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
});

export default apiClient;
