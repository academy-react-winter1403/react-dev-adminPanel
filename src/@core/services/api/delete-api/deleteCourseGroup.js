import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const deleteCourseGroup = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            console.log("dataObj ==>", dataObj)
            const response = await http.delete(endUrl, {
                data: dataObj,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return response
        }
    })
}