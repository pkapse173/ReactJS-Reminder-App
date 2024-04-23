import { initializeRouter } from "./routes/index.js";
import  express  from "express";
import  cors from "cors";
import mongoose from "mongoose";

export const initialise =(app) =>{

     //using cors
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());

    //connection with mongoose
    mongoose.connect(process.env.MONGO_CONNECTION);
    //initilising the routes
    initializeRouter(app);
}
