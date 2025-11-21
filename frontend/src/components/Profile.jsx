import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {user}=useSelector(state=>state.auth);
 const navigate=useNavigate();
  // useEffect(() => {
  //   axios.get("https://mern-shopin.onrender.com /api/users/profile", {
  //     withCredentials: true,
  //   }).then(response => {
  //     console.log("User profile data:", response.data);
  //   }).catch(error => {
  //     console.error("Error fetching user profile:", error);
  //   });
  // }, [])
  const handleEdit=()=>{
    //navigate to edit profile page
    navigate("/edit-profile");
  }
  const handleOrders=()=>{
    navigate("/orders");
  }
  const handleCart=()=>{
    navigate("/cart");
  }
  const handleProducts=()=>{
    navigate("/create-products");
  }
  return (
    <div className="hero bg-base-200 h-[88vh]">
      <div className="hero-content flex-col lg:flex-row border-2 border-white rounded-lg shadow-lg p-8 bg-blue-700 text-primary-content gap-10">
        <img
          src={`${user?.avatar?.url || "https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"}`}
          className="max-w-xs h-40 rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-4xl font-bold">{user && user.name}</h1>
          <p>Email:{user && user.email}</p>
          <p className="py-4" >Address:{user && user.addresses}</p>
           <div className="flex flex-col sm:flex-row gap-2"> 
            <button className="btn btn-sm btn-primary flex-1 sm:flex-none" onClick={handleEdit}>Edit</button>
            <button className="btn btn-sm btn-primary flex-1 sm:flex-none"onClick={handleOrders}>Orders</button>
            {user?.role==='admin' ?<button className="btn btn-sm btn-primary flex-1 sm:flex-none" onClick={handleProducts}>Create Products</button>:''}
            <button className="btn btn-sm btn-primary flex-1 sm:flex-none"onClick={handleCart}>Cart</button></div>
        </div>
      </div>
    </div>
  )
}

export default Profile