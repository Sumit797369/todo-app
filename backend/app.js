const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const cors = require("cors");
const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json());
app.use(cors())

app.use('/api/user',userRouter);
app.use("/api/tasks", taskRouter);

app.listen(PORT,()=>{
    console.log("server running");
    
})