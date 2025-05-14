import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const postLogin = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj, config] = data
            const fullData = await http.post(endUrl, dataObj)
            // console.log(fullData)
            return fullData
        }
    })
}