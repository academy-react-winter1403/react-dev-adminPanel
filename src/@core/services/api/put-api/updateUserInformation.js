import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const updateUserInformation = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            console.log("dataObj ==>", dataObj)
            const response = await http.put(endUrl, dataObj, {
                headers: {
                    "Content-Type": config
                }
            })
            return response
        }
    })
}