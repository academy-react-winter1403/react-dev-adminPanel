import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const getWorkDataWithId = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl] = data
            const response = await http.get(endUrl)
            return response
        }
    })
}