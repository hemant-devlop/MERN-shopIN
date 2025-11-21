import axios from "axios"

export const deleteProduct=async(id)=>{
    try {
        const res= await axios.put("https://mern-shopin.onrender.com /api/orders/delete",{id},{withCredentials:true})
        const result=res.data
        return result
    } catch (error) {
        console.error('error while delete',error)  
    }

}