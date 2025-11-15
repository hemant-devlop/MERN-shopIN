import React from "react";
import useFetch from "../hooks/useFetch";
import Product from "../../../backend/src/models/productSchema";
import { useSelector } from "react-redux";
const ProductCard = ({ image, name, price, handleBuy, handleAddToCart,handleUpdateProduct }) => {
const {user}=useSelector(state=>state.auth)

  return (
    <div className="card bg-base-100 max-w-66 shadow-sm relative">
      {user?.role==='admin' ?<span onClick={handleUpdateProduct} className="badge absolute bg-error top-2 right-2 z-2 cursor-pointer">edit</span> :''}

      <figure className="px-5 pt-5">
        <img
          src={image}
          alt={name}
         className="rounded-xl transition-transform duration-300 hover:scale-105"
 />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white text-lg font-semibold">{name}</h2>
         <p className="text-lg font-medium text-error">₹ {price}.00</p>
        <p>a oneplus phone 8/128 new lanch</p>
        <div className="card-actions">
          <button onClick={handleBuy} className="btn btn-primary">Buy Now</button>
          <button onClick={handleAddToCart} className="btn btn-outline btn-secondary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
