import {  useQuery } from "react-query"
import { http } from "../../interceptor"

export const getCourseUserListData = (key, endUrl, params, enabledFlag) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            console.log("enabledFlag ==>", enabledFlag)
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
            return groupData
        },
        enabled: enabledFlag,
        refetchOnReconnect: true,
    })
}