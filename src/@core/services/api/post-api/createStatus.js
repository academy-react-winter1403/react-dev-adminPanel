import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const createStatusPost = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.post(endUrl, dataObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response
        }
    })
}