import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useFetch = () => {
    const [productData,setProductData]=useState();
    useEffect(()=>{
        const fetchProducts= async()=>{
            try {
                const res=await axios.get('http://localhost:8000/api/products')
                setProductData(res.data)
            } catch (error) {
                console.error("error occur",error);
            }
        }
        fetchProducts();
    },[])
  return productData;
}

export default useFetch

