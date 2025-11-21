import axios from "axios"

export const addToCart = async (product) => {
    try {
        const res = await axios.post("https://mern-shopin.onrender.com/api/orders", product, { withCredentials: true });
        const result = res.data
        return result;
    } catch (error) {
        console.error('error while fetching...', error);
    }
}