import { useMutation, useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseGroupList = (key, endUrl, isEnabled) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, params] = data
            const response = await http.get(endUrl, {
                params: params
            })
            return response
        }
    })
}