import { useMutation, useQuery } from "react-query"
import { http } from "../../interceptor"

export const getUserListDataWithParams = (key, endUrl, queryParams) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            console.log("queryParams ==>", queryParams)
            const data = await http.get(endUrl, {
                params: queryParams
            })
            return data
        },
        // refetchOnReconnect: true,
        // refetchInterval,
        // refetchIntervalInBackground,
        refetchOnMount: true
        // refetchOnWindowFocus
    })
}


export const getUserListDataByAction = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, queryParams] = data
            console.log("queryParams ==>", queryParams)
            const fullData = await http.get(endUrl, {
                params: queryParams
            })
            return fullData
        }
    })
}