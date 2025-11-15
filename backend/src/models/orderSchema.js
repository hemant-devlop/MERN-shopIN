import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: String,
                quantity: Number,
                price: Number,
                image: String,
            },
        ],
        shippingInfo: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            phone: { type: String, required: true },
        },
        paymentInfo: {
            id: String, // payment gateway transaction ID
            status: {
                type: String,
                enum: ["pending", "paid", "failed"],
                default: "pending",
            },
            method: {
                type: String,
                enum: ["COD", "Card", "UPI"],
                default: "COD",
            },
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0,
        },
        orderStatus: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
        },
        deliveredAt: Date,
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
