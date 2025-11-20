import Order from '../models/orderSchema.js'

export const placeOrder = async (req, res) => {
    // const productId=req.body.orderItems[0].product
    let order;
    order = await Order.findOneAndUpdate(
        { user: req.user._id, "orderItems.product": req.body.orderItems[0].product },
        { $inc: { "orderItems.$.quantity": 1 } },
        { new: true }

    );
    if (!order) {
        order = await Order.create({
            user: req.user._id,
            ...req.body
        })
    }
    res.status(201).json(order)

}
export const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("orderItems.product")
    res.status(200).json(orders)
}
export const deleteUserOrders = async (req, res) => {
    const {orderId,productId}=req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
            $pull: {
                orderItems: { product: productId }
            }
        },
        { new: true }
    );

    res.json(updatedOrder);



    const orders = await Order.findOneAndDelete({ user: req.user._id }).populate("orderItems.product")
    res.status(200).json(orders)
}