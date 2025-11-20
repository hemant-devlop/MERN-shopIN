import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProducts } from '../redux/productSlice';
const useFetch = (url) => {
    const [productData, setProductData] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch=useDispatch()
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(url, { withCredentials: true })
                setProductData(res.data)
                dispatch(addProducts(res.data))
            } catch (error) {
                console.error("error occur", error);
                setError(error.message)
            } finally {
                setIsloading(false)
            }
        }
        fetchProducts();
    }, [url])
    return { productData, isLoading, error };
}

export default useFetch

