import Order from '../models/orderSchema.js'

export const placeOrder=async (req,res)=>{
    const order=await Order.create({
        user:req.user._id,
        ...req.body
    })
    res.status(201).json(order)
}
export const getUserOrders=async (req,res)=>{
    const orders=await Order.find({user:req.user._id}).populate("orderItems.product")
    res.status(200).json(orders)
}