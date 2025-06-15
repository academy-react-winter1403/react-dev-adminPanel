import { useMutation } from "react-query";
import { http } from "../../interceptor";

export const usePostDataTechnology = (key) => {
  return useMutation({
    mutationKey: key,
    mutationFn: async (data) => {
      const [endUrl, dataObj, params, config] = data;
      console.log(dataObj);
      const response = await http.post(endUrl, dataObj, {
        // params: params,
        headers: {
          "Content-Type": config,
        },
      });
      return response;
    },
  });
};
