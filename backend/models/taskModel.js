const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
title:{type:String,required:true},
description: { type: String },
completed: {type: Boolean, default: false},
user :[{type:mongoose.Types.ObjectId,ref:"User"}]
},{ timestamps: true })

module.exports = mongoose.model('Task',listSchema)