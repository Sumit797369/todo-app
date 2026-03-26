const mongoose = require("mongoose");

const connectDB = async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MOngo connected");
        
    }catch(error){
        res.status(400).json({message:"Not Connected"})
        
    }
}

module.exports = connectDB;