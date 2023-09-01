import  express  from 'express';
import  colors  from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from './routes/productRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url'


dotenv.config();

connectDB();
//rest obbject
const __filename = fileURLToPath(import.meta.url)
const app =express();

//middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product", productRoutes);

const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, './client/build')))
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
});

//PORT
const PORT=process.env.PORT||8080

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`.bgCyan.white)

});