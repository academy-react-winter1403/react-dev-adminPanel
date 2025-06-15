import { useMutation, useQuery } from "react-query";
import { http } from "../../interceptor";

export const getUserComment = (key, endUrl, params, setFlag) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = await http.get(endUrl, { params: params }); 
      console.log(response); 
      return response; 
    },
    refetchOnReconnect: true,
  });
};
