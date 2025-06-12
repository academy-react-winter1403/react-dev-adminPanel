import { useQuery } from "react-query"
import { http } from "../../interceptor";

export const getCourseAllComment = (key, endUrl, params) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl, {
                params: params
            })
            return response
        },
        refetchOnReconnect: true
    })
}