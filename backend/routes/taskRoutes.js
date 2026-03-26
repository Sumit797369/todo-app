const express = require("express");
const {addTask} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/addtask", authMiddleware, addTask);
// userRouter.post("/", authMiddleware, createTask);
// userRouter.put("/:id", authMiddleware, updateTask);
// userRouter.delete("/:id", authMiddleware, deleteTask);

module.exports = userRouter;