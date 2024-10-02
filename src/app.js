import express from 'express';
import { mongooseDB } from './config/db';
import productRouters from './routers/products'
import authRouter from './routers/auth' 


const app = express();
app.use(express.json());

app.use('/api',productRouters);
app.use('/api',authRouter);

mongooseDB();

export const viteNodeApp = app;
