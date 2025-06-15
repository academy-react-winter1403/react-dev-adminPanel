import { useMutation, useQuery } from "react-query";
import { http } from "../../interceptor";

export const getData = (key, endUrl) => {
  // return useQuery({
  //     queryKey:key,
  //     queryFn:async () => {
  //         let data = await http.get(endUrl)
  //         return data
  //     }
  // })
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await http.get(endUrl);
      // console.log("getBuildingData",data)
      return data;
    },
    refetchOnReconnect: true,
  });
};
