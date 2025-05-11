import { http } from "../../interceptor"

export const deleteData = async (endUrl,productId) => {
    let data = await http.delete(endUrl,productId)
    return data
}