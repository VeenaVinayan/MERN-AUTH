import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/adminRoutes.js'
import cors from 'cors';

const port =process.env.PORT || 7000;
const app=express();
connectDB();

app.use(cors({
     origin :'http://localhost:3000',
     credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/admin',adminRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on port ${port}`));
