const express = require("express");
const {addTask,getTasks,updateTask,deleteTask} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getTasks);
userRouter.post("/addTask", authMiddleware, addTask);
userRouter.put("/updateTask/:id", authMiddleware, updateTask);
userRouter.delete("/deletetask/:id", authMiddleware, deleteTask);

module.exports = userRouter;