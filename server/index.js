import express from "express"
import connetDB from "./database/dbConnect.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.routes.js"
import courseRoute from "./routes/course.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config({});//for accessing .env variables
connetDB()

const app = express()

const PORT = process.env.PORT || 3000;

//default middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173" || "http://localhost:5174",
    credentials: true,
  })
);
//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})