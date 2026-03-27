const validator = require("validator");
const taskModel = require("../models/taskModel");

//create
const addTask = async (req, res) => {
  try {
    const { title, description} = req.body;
    //input validation
     if (!title || validator.isEmpty(title.trim())) {
      return res.json({
        success: false,
        message: "Please fill the title"
      });
    }
    
    const task = new taskModel({ user: req.userId,title,description });

    await task.save();

    res.json({ success: true, task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }};

// read
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({ user: req.userId });
    res.json({ success: true, tasks });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }};

// update
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({ success: true, task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }};

// delete
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await taskModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }};

module.exports = { addTask,getTasks,updateTask,deleteTask};