import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const deleteUser = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            const response = await http.delete(endUrl, {
                headers: {
                    "Content-Type": config
                },
                data: {
                    dataObj
                }
            })
            return response
        }
    })
}