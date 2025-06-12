import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseCommentSingel = (key, endUrl, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const data = await http.get(endUrl)
            return data
        },
        enabled: enabledFlag,
        refetchOnReconnect: true
    })
}