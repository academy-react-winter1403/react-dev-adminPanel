import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseSocialGroup = (key, endUrl, courseId) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl)
            console.log("response ==>", response)
            const filteredData = response.filter(item => item.courseId === courseId)
            return filteredData
        },
        refetchOnReconnect: true,
    })
}