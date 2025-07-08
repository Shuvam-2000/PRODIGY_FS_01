import { configDotenv } from "dotenv";
import express from 'express';
import cors from 'cors';
import './utils/connection.js'
import userRoute from './routes/user.routes.js'
import productRoute from './routes/product.routes.js'

// initailize express
const app = express();

configDotenv();

// initialize the port 
const PORT = process.env.PORT || 8001;

// middleware
app.use(express.json());
app.use(cors());

// test route
app.get('/', (req,res) => {
    res.send("Hello Server is Runing")
});

// routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

// run the server
app.listen(PORT, () => console.log(`Server runing on PORT: ${PORT}`));
