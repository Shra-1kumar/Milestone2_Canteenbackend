const express = require('express');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const menuRouter = require('./routers/menuRouter');
const staffRouter = require('./routers/staffRouter');
const orderRouter = require('./routers/orderRouter');
const walletRouter = require('./routers/walletRouter');
const app = express();


require('dotenv').config();

require('./db/connect');

const port = process.env.PORT | 8000;
app.use(express.json());
app.use(express.urlencoded({ extended:false })); 
app.use(cors({ origin:process.env.PROD_URL,credentials:true }));
app.use(cookieParser());

app.get('/', (req,res) => {res.status(200).send('hello bro')});

//app.use('/v1/api/user',userRouter);
app.use('/v1/api/products',productRouter);
app.use('/v1/api/menu',menuRouter);
app.use('/v1/api/staff',staffRouter);
app.use('/v1/api/orders',orderRouter);
app.use('/v1/api/user',userRouter);
app.use('/v1/api/wallet',walletRouter);

app.listen(port,() => console.log(`server is running at port:${port}`));

