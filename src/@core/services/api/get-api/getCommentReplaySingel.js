import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCommentReplaySingel = (key, endUrl, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl)
            return response
        },
        enabled: enabledFlag
    })
}