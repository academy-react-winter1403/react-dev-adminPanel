import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const rejectComment = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.post(endUrl, "", {
                params: dataObj
            })
            return response
        }
    })
}