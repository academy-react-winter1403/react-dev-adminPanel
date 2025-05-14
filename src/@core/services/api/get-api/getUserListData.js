import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getUserListData = (key, endUrl, queryParams) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            console.log(queryParams)
            const data = await http.get(endUrl)
            return data
        }
    })
}