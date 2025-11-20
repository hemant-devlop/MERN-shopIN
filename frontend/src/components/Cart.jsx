import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const {cartProduct}=useSelector(state=>state.cart)
  const cartProducts=cartProduct?.map(item=>item?.orderItems)
  const cartArr=cartProducts?.map(item=>item[0])
  const total=cartArr?.reduce((acc,val)=>acc+val.price,0)
  return (
    <>
      <div className="flex w-full relative">
        <div className="bg-gray-900 min-h-screen w-full md:w-3/4 mb-52 sm:mb-0 ">
        {cartArr?cartArr?.map((item)=><CartItem key={item?._id} product={item}  />):<h2 className="p-6 text-3xl text-center font-extrabold">Cart is empty</h2>}
        </div>
        {/* cart checkout  */}
        <div className="md:w-1/4 fixed bottom-0 w-full md:right-0 md:top-14">
          <div className="bg-base-100 shadow-lg rounded-sm p-2 md:p-6">
            {/* Title */}
            <h2 className=" sm:text-lg font-semibold sm:mb-4 ">PRICE DETAILS</h2>
            <div className="flex justify-between md:py-2 text-xs ">
              <span>Price (3 items)</span>
              <span className="font-medium">₹{total}</span>
            </div>
            <div className="flex justify-between md:py-2 text-green-600 text-xs md:text-sm">
              <span>Discount</span>
              <span className="font-medium">– ₹38,135</span>
            </div>
            <div className="flex justify-between mb-1 md:py-2 text-xs md:text-sm ">
              <span>Protect Promise Fee</span>
              <span className="font-medium">₹228</span>
            </div>
            <div className="border-t md:my-4"></div>
            <div className="flex justify-between py-1 md:py-2">
              <span className="text-lg font-semibold ">Total Amount </span>
              <span className="text-lg font-bold">₹{total}</span>
            </div>
            <p className="mt-2 hidden md:block text-green-600 font-medium">You will save ₹37,907 on this order</p>
            <button className="btn btn-primary w-full mt:2 sm:mt-6 text-lg">
              ORDER PLACE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;