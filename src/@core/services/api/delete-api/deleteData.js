import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const deleteData = async (key) => {
    return useMutation({
        mutationKey:key,
        mutationFn:async (data) => {
            const [endUrl,productId,dataObj,params] = data
            const response = await http.delete(`${endUrl}${productId}`,dataObj,{
                params:params
            })
            return response.data
        }
    })
}