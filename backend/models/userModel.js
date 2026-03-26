const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username :{type: String},
    email :{type: String, required: true, unique: true},
    password :{type: String, required: true},
    list :[{type:  mongoose.Types.ObjectId,ref:"Task"}],
})
module.exports = mongoose.model('User',userSchema)