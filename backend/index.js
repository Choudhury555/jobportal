import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import path from "path"

dotenv.config({});

const app = express();



//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

app.get("/home",(req,res)=>{
    return res.status(200).json({
        success:true,
        mssage:"Message from home path backend"
    });
})

//deployment part started
const dirname = path.resolve();
app.use(express.static(path.join(dirname,"/frontend/dist")));//dist will be formed after "npm run build"

//this will serve the "frontend files" from "backend"
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirname,"frontend","dist","index.html"));//inside this "dist" folder(above mentioned) "index.html"(root file for frontend) is there
})
//deployment part ended

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    connectDB();
    console.log(`SERVER IS RUNNING AT PORT ${PORT}`);
})