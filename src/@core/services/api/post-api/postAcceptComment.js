import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const postAcceptComment = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, queryParams] = data
            const response = await http.post(endUrl, dataObj, {
                params: queryParams
            })
            return response
        }
    })
}