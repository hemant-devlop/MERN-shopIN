import React, { useState } from 'react'
import { deleteProduct } from '../services/deleteProduct'

const CartItem = ({ product }) => {
    // console.log(product)
    const [incq, setIncq] = useState(product.quantity)
    const handleincq = () => {
        setIncq(incq + 1)
    }
    const handledecq = (id) => {
        incq == 1 ? removeItem(id) : setIncq(incq - 1)
    }
    const removeItem = (id) => {
        alert(id)
    }
    const handleRemoveProduct = (id) => {
            console.log(id)
        // deleteProduct()
    }
    return (
        <>
            <div className="flex items-center gap-2 p-2 sm:p-4 justify-center">
                {/* Product Image */}
                <img
                    src={product?.image}
                    className="max-w-sm h-30 rounded-lg shadow-xl object-cover"
                />

                {/* Product Details */}
                <div className="max-w-sm w-sm space-y-0.5">
                    <h1 className="sm:text-xl font-bold line-clamp-1">{product.name}</h1>

                    <p className="sm:text-lg text-gray-600 line-clamp-1">
                        {product.product.description}
                    </p>

                    <p className="sm:text-xl font-semibold text-primary">₹{product.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center sm:flex-row gap-2 sm:gap-4">
                        <div className='space-x-4 self-start sm:self-center'>
                            <button className="btn btn-xs sm:btn-sm btn-outline btn-primary text-xl" onClick={() => handledecq("id0000")}>-</button>
                            <span className="text-xl font-semibold">{incq}</span>
                            <button className="btn btn-xs sm:btn-sm btn-outline btn-primary text-xl" onClick={handleincq}>+</button>
                        </div>
                        <div className='space-x-4 self-start sm:self-center flex flex-nowrap'>
                            <button className="btn btn-xs sm:btn-sm btn-secondary w-auto" onClick={() => handleRemoveProduct(product)}>Remove</button>
                            <button className="btn btn-xs sm:btn-sm btn-outline w-auto">Add Wishlist</button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                </div>
            </div>
        </ >
    )
}

export default CartItem