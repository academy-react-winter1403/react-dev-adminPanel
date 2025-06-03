import { useMutation, useQuery } from "react-query"
import { http } from "../../interceptor"

export const getClasesRoomDataWithId = (key) => {
    return useMutation({
        mutationKey: key,
        mutationFn: async (endUrl) => {
            const data = await http.get(endUrl)
            return data
        }
    })
}