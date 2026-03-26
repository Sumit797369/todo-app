const express = require("express");
const {addTask,getTasks} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getTasks);
userRouter.post("/addtask", authMiddleware, addTask);
// userRouter.put("/:id", authMiddleware, updateTask);
// userRouter.delete("/:id", authMiddleware, deleteTask);

module.exports = userRouter;