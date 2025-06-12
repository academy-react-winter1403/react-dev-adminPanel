import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const postReplayToComment = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            const response = await http.post(endUrl, dataObj, {
                headers: {
                    "Content-Type": config,
                }
            })
            return response
        }
    })
}