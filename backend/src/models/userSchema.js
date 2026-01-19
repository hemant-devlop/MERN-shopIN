import mongoose from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
        },
        email: {
            type: String,
            validate:{
                validator:v=>v.includes("@"),
                message:props=>`${props.value} is not a valid email`
            },
            required: [true, "Please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            minlength:6
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minlength: 6,
            select: false, // hides password when fetching user
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        phone: {
            type: String,
            trim: true,
        },
        addresses: {
            type: String,
            trim: true,
        },
        cart: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                price: Number, // store price at time of adding to cart
            },
        ],
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Order",
            },
        ],
        avatar: {
            public_id: String,
            url: String,
        },
    }, { timestamps: true }
)


//hash password before save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//compare password during login
userSchema.methods.comparePassword = async function(enterPassword) {
   return await bcrypt.compare(enterPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User;