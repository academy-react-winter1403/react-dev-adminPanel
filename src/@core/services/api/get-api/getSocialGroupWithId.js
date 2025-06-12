import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getSocialGroupWithId = (key, endUrl, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl)
            return response
        },
        refetchOnReconnect: true,
        enabled: !!enabledFlag
    })
}