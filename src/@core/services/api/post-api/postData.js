// import { useGetItem } from "../../../../utility/hooks/useLocalStorage";
// const token = useGetItem("token");
//         headers: {
//             Authorization: token ? token : null,
//         }
import { useMutation } from "react-query";
import { http } from "../../interceptor";
// import instance from "../../interceptor";

export const postData = async (key) => {
  return useMutation({
    mutationKey: key,
    mutationFn: async (data) => {
      const [endUrl, productId, dataObj, params] = data;
      const response = await http.post(`${endUrl}${productId}`, dataObj, {
        params: params,
      });
      return response.data;
    },
  });
};
