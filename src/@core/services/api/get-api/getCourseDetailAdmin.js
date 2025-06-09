import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseDetailAdmin = (key, courseDetailUrl, isEnabled) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(courseDetailUrl)
            const groupData = Promise.all(response.courseSchedules.map(async (item) => {
                console.log("item ==>", item)
                    return await http.get(`/CourseGroup/Details?Id=${item.courseGroupId}`)
                }))
            return groupData
        },
        enabled: isEnabled
    })
}