import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const useUpdateClasesRoom = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            const fullData = await http.put(endUrl, dataObj, {
                headers: {
                    "Content-Type": config
                }
            })
            return fullData
        }
    })
}