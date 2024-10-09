import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"

dotenv.config({});

const app = express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);

app.get("/home",(req,res)=>{
    return res.status(200).json({
        success:true,
        mssage:"Message from home path backend"
    });
})

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    connectDB();
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
})