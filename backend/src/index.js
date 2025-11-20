import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/authRoute.js'
import product from './routes/productRoute.js'
import order from './routes/orderRoute.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
//database connection
connectDB()

const app = express();

app.use(
  cors({
  origin:["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())
//routes
app.use('/api/users',userRoutes)
app.use('/api/products',product)
app.use('/api/orders',order)


app.get('/', (req, res) => {
  res.status(200).json({name:'ShopIn'});  
});

//server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
