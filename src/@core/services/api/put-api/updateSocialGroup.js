import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const updateSocialGroup = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.put(endUrl, dataObj)
            return response
        }
    })
}