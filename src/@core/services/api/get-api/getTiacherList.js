import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getTeacherList = (key, endUrl) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const data = await http.get(endUrl)
            return data
        }
    })
}