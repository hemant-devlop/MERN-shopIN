import mongoose from "mongoose";

const connectDB= async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB connected')

    }catch(err){
        console.error('database connection faild',err)
    }
   
}

export default connectDB;