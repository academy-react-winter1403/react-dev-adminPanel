import axios from "axios";
import toast from "react-hot-toast";
import {
  useGetItem,
  useRemoveItem,
} from "../../../utility/hooks/useLocalStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

let token = useGetItem("token")

const http = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  return response.data;
};

const onError = (error) => {
  if (error.response && error.response.status === 422) {
    const errorMessage =
      error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
    toast.error(errorMessage?.[0] || "با خطا مواجه شدید");
  } else if (error.response.status === 401) {
    toast.error("ابتدا وارد حساب کاربری خود شوید");
    useRemoveItem("token");
  } else if (error.response.status === 403) {
    const errorMessage =
      error.response.data.ErrorMessage || "خطا: ورودی نامعتبر.";
    toast.error(errorMessage?.[0] || "با خطا مواجه شدید");
  } else {
    const errorMessage = error.response.data.ErrorMessage;
    toast.error(errorMessage?.[0]);
  }

  return Promise.reject(error);
};

http.interceptors.response.use(onSuccess, onError);

http.interceptors.request.use((opt) => {
  // const token = localStorage.getItem("token")

  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export {http};
