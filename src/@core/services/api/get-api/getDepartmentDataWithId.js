import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getDepartmentDataWithId = (key, endUrl, flag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const data = await http.get(endUrl)
            return data
        },
        enabled: flag
    })
}