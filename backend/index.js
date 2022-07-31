import express from "express";
import morgan from "morgan";
import mongoose from 'mongoose';
import cors from "cors"
import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"))
app.use(express.json({limit: "30mb" , extended :true }))
app.use(express.urlencoded({limit: "30mb" , extended :true }))

const corsOptions = {
    // origin: 'https://shiny-gumdrop-e14236.netlify.app', 
    origin: true, 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200    
}

app.use(cors(corsOptions));
app.use(cookieParser())

app.use("/users" , userRouter)
app.use("/tours" , tourRouter)

const MONGO = "mongodb+srv://motown:motown@cluster0.kl6zq.mongodb.net/tour_db?retryWrites=true&w=majority"
const port = 5000;

mongoose.connect(MONGO).then(()=>{
    app.listen(port , ()=>{
        console.log('server spinned')
    })
}).catch(()=>{
    console.log('drake')
})
