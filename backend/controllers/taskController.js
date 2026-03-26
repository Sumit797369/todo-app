const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

const addTask = async (req, res) => {
  try {
    const { title, description} = req.body;
    // const  existingUser = await userModel.findOne({email});
    // if(existingUser){
    //     const task = new taskModel({title,description,user:existingUser});
    //    await task.save();
    //    existingUser.list.push(task);
    //    existingUser.save()
    // }
    const task = new taskModel({ user: req.userId,title,description });

    await task.save();

    res.json({ success: true, task });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  addTask,
 
};