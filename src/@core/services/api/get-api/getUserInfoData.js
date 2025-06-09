import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getUserInfoData = (key, endUrl, id) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const data = await http.get(`${endUrl}${id}`)
            return data
        }
    })
}