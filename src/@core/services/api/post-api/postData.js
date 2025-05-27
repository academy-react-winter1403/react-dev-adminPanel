import { useMutation } from "react-query";
import { http } from "../../interceptor";

export const usePostData = (key) => {
  return useMutation({
    mutationKey: key,
    mutationFn: async (data) => {
      const [endUrl, dataObj, config] = data;
      console.log(dataObj)
      const response = await http.post(endUrl, dataObj, {
        headers: {
          "Content-Type": config
        }
      });
      return response.data;
    },
  });
};
