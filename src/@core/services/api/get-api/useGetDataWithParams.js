import { useQuery } from "react-query";
import { http } from "../../interceptor";

export const useGetDataWithParams = (key, endUrl, enabledFlag) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = http.get(endUrl)
      return response
    },
    enabled:enabledFlag,
  });
};