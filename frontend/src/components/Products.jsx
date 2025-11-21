
import ProductCard from './ProductCard'
import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import Product from './Product';
import { getProductById } from '../services/getProductsbyId';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/singleProduct';

const Products = () => {
  const navigate = useNavigate()
  const[crtProduct,setcartProduct]=useState();
  const dispatch=useDispatch()
  const { productData: products, isLoading, error } = useFetch("https://mern-shopin.onrender.com /api/products");
    // console.log(products)
  //product add to cart
  const handleAddToCart = (product) => {
   console.log(product)
  }
  //product buy
  const handleBuy = (id) => {
    alert(id)
  }
  //product edit
  const handleUpdateProduct = (id) => {
    alert(id)
  }
  const handleGetProductById = (id) => {
      getProductById(id).then(res =>dispatch(addProduct(res)))
      navigate(`/product/${id}`);
  }
  // if else mai query param se edhar hi pel de 
  if (isLoading) { <span className="loading loading-dots loading-md"></span> }
  if (error) <h2 className='text-2xl bg-red-700'>{error}</h2>
  return (<>
    <div className='flex justify-center'>
      <h3 className='text-3xl font-bold text-center py-2 inline-block border m-2 p-2 rounded-xl'>Our Products</h3>
    </div>
    <div className='flex gap-6 p-4 flex-wrap justify-center'>
      {products && products.map((product) =>
        <ProductCard key={product._id} image={product.image.url} name={product.name} price={product.price} description={product.description}
          handleBuy={() => handleBuy(product._id)}
          handleGetProductById={() => handleGetProductById(product._id)}
          handleAddToCart={() => handleAddToCart(product)}
          handleUpdateProduct={() => handleUpdateProduct(product._id)} />
      )}
    </div>
  </>
  )
}

export default Products