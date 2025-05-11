import { http } from "../../interceptor"

export const putData = async (endUrl,data,config) => {
    let response = await http.put(endUrl,data,config)
    return response
}