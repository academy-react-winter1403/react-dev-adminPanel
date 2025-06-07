import { useQuery } from "react-query";
import { http } from "../../interceptor";

export const getAllCourseAdmin = (key, endUrl, params) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await http.get(endUrl, {
        params: params,
      });
      return data;
    },
    refetchOnReconnect: true
  });
};
