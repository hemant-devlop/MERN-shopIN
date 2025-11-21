import axios from "axios";
export async function getProductById(id){
    try {
        const res=await axios.get(`https://mern-shopin.onrender.com /api/products/${id}`,{withCredentials:true})
        const data=res.data
        return data
    } catch (error) {
        console.error('error occur during get product',error.message)
    }

}

export async function userOrders() {
    try {
        const res=await axios.get("https://mern-shopin.onrender.com /api/orders",{withCredentials:true})
        const data=res.data
        return data
        console.log(data)
    } catch (error) {
        console.error('error while getting orders',error)
    }
    
}