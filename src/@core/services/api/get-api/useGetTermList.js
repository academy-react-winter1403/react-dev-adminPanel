import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const useGetTermList = (key, endUrl) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl)
            return response
        }
    })
}