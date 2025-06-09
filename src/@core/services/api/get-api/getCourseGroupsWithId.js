import { useMutation, useQueries, useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseGroupsWithId = (key, endUrl, params, getFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl, {
                params: params
            })
            return response
        },
        enabled: getFlag
    })
}