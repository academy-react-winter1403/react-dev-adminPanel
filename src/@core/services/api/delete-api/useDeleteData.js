import { useMutation } from "react-query";
import { http } from "../../interceptor";

export const useDeleteData = (key) => {
  return useMutation({
    mutationKey: key,
    mutationFn: async (data) => {
      const [endUrl, dataObj, config] = data;
      console.log(dataObj);
      const response = await http.delete(endUrl,{
        data:dataObj,
        headers: {
          "Content-Type": config,
        },
      });
      return response;
    },
  });
};
