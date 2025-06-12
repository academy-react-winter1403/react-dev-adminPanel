import { useQuery } from "react-query";
import { http } from "../../interceptor";

export const getNewsCommentSingelData = (key, endUrl, params, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const data = await http.get(endUrl, {
                params: params
            })
            return data
        },
        enabled: enabledFlag,
        refetchOnReconnect: true
    })
}