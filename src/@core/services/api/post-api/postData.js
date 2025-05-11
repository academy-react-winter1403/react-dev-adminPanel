import { useGetItem } from "../../../../utility/hooks/useLocalStorage"
import { http } from "../../interceptor"

const token = useGetItem('token')
export const postData = async (endUrl,dataObj) => {
    let data = await http.post(endUrl,dataObj , {
        headers: {
            Authorization: token ? token : null,
        }
    })
    return data
}