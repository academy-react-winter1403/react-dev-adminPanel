import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const createClasesRoomPost = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            const response = await http.post(endUrl, dataObj)
            return response
        }
    })
}