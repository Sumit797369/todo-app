const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const app = express()
connectDB()

app.use(express.json());

app.use('/api/user',userRouter);
app.use("/api/tasks", taskRouter);

app.listen(5000,()=>{
    console.log("server running");
    
})