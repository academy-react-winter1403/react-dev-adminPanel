import { useMutation } from "react-query";
import { http } from "../../interceptor";

export const usePutData = (key) => {
  return useMutation({
    mutationKey: key,
    mutationFn: async (data) => {
      const [endUrl, dataObj, config] = data;
      console.log(dataObj);
      const response = await http.put(endUrl, dataObj, {
        headers: {
          "Content-Type": config,
        },
      });
      return response.data;
    },
  });
};
