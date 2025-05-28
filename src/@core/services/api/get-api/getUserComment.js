import { useMutation, useQuery } from "react-query";
import { http } from "../../interceptor";

export const getUserComment = (key, endUrl, params, setFlag) => {
  return useQuery({
    queryKey: key, // کلید کوئری
    queryFn: async () => {
      const response = await http.get(endUrl, { params: params }); // درخواست به API
      console.log(response); // لاگ داده‌های دریافتی
      return response; // برگرداندن داده‌های مورد نیاز
    },
    refetchOnReconnect: true,
  });
};
