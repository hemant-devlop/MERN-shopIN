import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js'

const protect=async(req,res,next)=>{
  let token=req.cookies.token;
    try {
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            req.user= await User.findById(decode.id).select("-password");
            next();
        } catch (error) {
             return res.status(401).json({message:"unauthorized, token faild"});
        }
        if(!token){
                return res.status(401).json({message:"unauthorized : token not found"})
            }
}

export default protect;