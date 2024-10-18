import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './routes/userRoutes.js';
import { notFound,errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

const port =process.env.PORT || 7000;
const app=express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/user',userRoutes);

app.get('/',(req,res) => res.send('Server is ready !!'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log(`Server started on port ${port}`));
