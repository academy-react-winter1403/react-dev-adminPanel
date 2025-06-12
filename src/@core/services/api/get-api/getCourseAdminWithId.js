import { useMutation, useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseAdminWithId = (key, endUrl, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl)
            return response
        },
        enabled: enabledFlag,
        refetchOnReconnect: true
    })
}