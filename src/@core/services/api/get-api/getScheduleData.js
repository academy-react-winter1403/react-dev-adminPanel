import { useQuery } from "react-query"
import { http } from "../../interceptor"
import { addedDataToObject } from "../../../hooks"

export const getScheduleData = (key, endUrl, params) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            const response = await http.get(endUrl, {
                params: params
            })
            const groupData = await Promise.all(response.map(async (item) => {
                const groupResponse = await http.get("/CourseGroup/Details", {
                    params: {
                        Id: item.courseGroupId
                    }
                })
                const dataObj = {...item, groupName: groupResponse.courseGroupDto.groupName}
                return dataObj
            }))
            console.log("groupData ==>", groupData)
            return groupData
        },
        refetchOnReconnect: true
    })
}