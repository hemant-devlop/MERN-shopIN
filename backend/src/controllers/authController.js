import User from '../models/userSchema.js'
import generateToken from '../utils/generateToken.js'
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

//register user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'Invalid email,already exists' });

        const user = await User.create({ name, email, password })
        const token = await generateToken(user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
};
//login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(400).json({ message: "User not found" });
        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ message: 'user password invalid' });
        const token = await generateToken(user._id)
        await res.cookie('token', token, { httpOnly: true,secure:true, sameSite: 'none', maxAge: 1 * 24 * 60 * 60 * 1000  });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            addresses: user.addresses,
            orders: user.orders,
            cart: user.cart, 
            token
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};
//update user profile
export const userProfile = async (req, res) => {
    try {
        const { name, address,email } = req.body;
        console.log(name,address,email)
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });
        // Update user information
        if (name) user.name = name;
        // const isEmailExist = await User.findById(req.user._id);
        // if (email) user.email = email;
        if (address) user.addresses = address;
        if (req.file) {
            const stream = Readable.from(req.file.buffer);
            const result = await new Promise((resolve, rejects) => {
                const uploadSteam = cloudinary.uploader.upload_stream({ folder: "mern_users" }, (err, result) => {
                    if (err) return rejects(err)
                    else resolve(result);
                })
                stream.pipe(uploadSteam)
            });
            user.avatar = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }
        const token = await generateToken(user._id)
        await user.save();
        res.status(201).json({
            user,
            token,
        })
    } catch (error) {
    res.status(500).json({ message: error.message });
}
};
//logout user
export const logout = async (req, res) => {
    try {
        res.cookie('token', "", { maxAge: 0 });
        res.status(200).json({ message: 'logged out successlly' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getUserProfile = async (req, res) => {
    res.json(req.user)
    console.log("user", req.user)
};