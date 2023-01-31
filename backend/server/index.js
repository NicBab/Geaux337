const PORT = process.env.PORT || 6001;
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { register } from ".././api/controllers/auth.js"
import authRoutes from "../api/routes/auth.js"
import userRoutes from "../api/routes/users.js"
import postRoutes from "../api/routes/posts.js"


const app = express();
dotenv.config()
app.use(express.json());
app.use(cors());

//ROUTES WITH FILES

//ROUTES
app.post("/auth/register", register);
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

//MONGOOSE CONFIG
mongoose.set("strictQuery", true)
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
    //ADD DATA ONE TIME
    // User.insertMany(users)
    // Post.insertMany(posts)
  })
  .catch((error) => console.log(`${error} did not connect to DB`));