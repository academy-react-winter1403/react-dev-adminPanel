import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const createUserPost = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const fullData = await http.post(endUrl, dataObj)
            return fullData
        }
    })
}