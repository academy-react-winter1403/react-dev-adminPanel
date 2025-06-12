import { useQuery } from "react-query"
import { http } from "../../interceptor"

export const getMentorListData = (key, endUrl) => {
    return useQuery({
        queryKey: key,
        queryFn: async () => {
            let fullData = []
            let dataObject = {}
            const response = await http.get(endUrl)
            const response2 = await Promise.all(response.map( async (item) => {
                const getUserEmail = await http.get(`/User/UserDetails/${item.userId}`)
                dataObject = {...item, gmail: getUserEmail.gmail}
                fullData.push(dataObject)
            }))
            return fullData
        },
        refetchOnReconnect: true
    })
}