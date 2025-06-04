import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const updateTermDate = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.put(endUrl, dataObj)
            return response
        }
    })
}