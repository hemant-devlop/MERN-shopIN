import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, userOrders } from "../services/getProductsbyId";
import { addToCart } from "../services/addProductToCart";
// import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addCartProducts } from "../redux/cartSlice";

export default function Product() {
  const {cartProduct:product}=useSelector(state=>state.product)
  // console.log(product)
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.auth)
  const { id } = useParams()
  const handleBuy = () => { 
    alert('Right now this feature is in development....')
  }
  const handleNotLogin=()=>{
    alert('logged in please')
    navigate('/login')
  }
  const handleAddToCart = () => {
    const cartProduct = {
      orderItems: [
        {
          product: product._id,
          image: product.image.url,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ]
    }

    addToCart(cartProduct).then(res =>console.log(res) ).catch(err=>console.log(err)).finally(alert('added to cart'))
    // console.log(cartProduct)
    
  }
  return (
    <div className="sm:w-2/3 min-h-screen p-6 gap-6 mx-auto">
      {/* LEFT IMAGE SECTION */}
      <div className="w-full bg-white p-6 rounded-t-xl shadow-md flex flex-col items-center gap-4">
        <img
          src={product?.image?.url}
          alt={product?.name}
          className="w-[250px] rounded-xl shadow"
        />

        <div className="flex gap-4 w-full">
          <button onClick={user?handleAddToCart:handleNotLogin} className="flex-1 bg-orange-500 text-white text-lg py-3 rounded-xl">
            Add to Cart
          </button>
          <button onClick={handleBuy} className="flex-1 bg-yellow-500 text-white text-lg py-3 rounded-xl">
            Buy Now
          </button>
        </div>
      </div>

      {/* RIGHT DETAILS SECTION */}
      <div className="w-full bg-white px-6 pb-6 rounded-b-xl shadow-md">
        <h1 className="text-2xl font-semibold text-black">{product?.name}</h1>

        {/* <div className="flex items-center gap-3 mt-2">
          <span className="bg-green-600 text-white px-3 py-1 rounded-xl text-sm">
            {product?.rating} ★
          </span>
          <span className="text-gray-600 text-sm">
            (0 ratings)
          </span>
        </div> */}

        <div className="2">
          <span className="text-3xl font-bold text-black">₹{product?.price}</span>
          {/* <span className="text-gray-500 line-through ml-3 text-lg">
            1
          </span> */}
          <span className="text-green-600 font-semibold ml-3 text-lg">
            {/* {product.discount}% off */}
          </span>
        </div>

        <p className="mt-4 text-gray-700 leading-relaxed">
          {product?.description}
        </p>

        {/* <h2 className="text-xl font-semibold mt-6 mb-2 text-black">Key Features</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          {product.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}