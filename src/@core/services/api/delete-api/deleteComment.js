import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const deleteComment = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.delete(endUrl, {
                params: dataObj
            })
            return response
        }
    })
}