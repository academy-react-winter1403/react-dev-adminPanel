import { useQuery } from "react-query";
import { http } from "../../interceptor";

export const getTeacherCourses = (key, endUrl, params) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const response = http.get(endUrl, {
        params: params,
      });
      return response
    },
    refetchOnReconnect: true,
  });
};