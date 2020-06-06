const mongoose = require("mongoose");

var taskSchema=new mongoose.Schema({
    title:String,
    body:String,
    taskType:String,
    status:String,
    dueDate:{
        type: Date
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    created:{type:Date,default:Date.now}
});

module.exports = mongoose.model("Task",taskSchema);