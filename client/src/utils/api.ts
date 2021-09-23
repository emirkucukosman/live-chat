import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:9090";

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) return Promise.reject(error.response.data.message);
    if (error.request) return Promise.reject("Server could not respond.");
    return Promise.reject("An unexpected error has occured.");
  }
);

export default api;
