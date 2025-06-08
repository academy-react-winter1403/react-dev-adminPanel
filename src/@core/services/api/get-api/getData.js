import { useMutation, useQuery } from "react-query";
import { http } from "../../interceptor";

export const getData = (key,endUrl) => {
    return useQuery({
        queryKey:key,
        queryFn:async () => {
            let data = await http.get(endUrl)
            // console.log('it is data',data)
            return data
        }
    })
}