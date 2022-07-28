import express from "express";
import morgan from "morgan";
import mongoose from 'mongoose';
import cors from "cors"
import userRouter from "./routes/user.js"

const app = express();

app.use(morgan("dev"))
app.use(express.json({limit: "30mb" , extended :true }))
app.use(express.urlencoded({limit: "30mb" , extended :true }))
app.use(cors());

app.use("/users" , userRouter)

const MONGO = "mongodb+srv://motown:motown@cluster0.kl6zq.mongodb.net/tour_db?retryWrites=true&w=majority"
const port = 5000;

mongoose.connect(MONGO).then(()=>{
    app.listen(port , ()=>{
        console.log('server spinned')
    })
}).catch(()=>{
    console.log('drake')
})
