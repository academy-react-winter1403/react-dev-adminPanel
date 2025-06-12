import { useMutation } from "react-query"
import { http } from "../../interceptor"

export const createCourseGroupPost = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (data) => {
            const [endUrl, dataObj] = data
            const response = await http.post(endUrl, dataObj, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            return response
        }
    })
}