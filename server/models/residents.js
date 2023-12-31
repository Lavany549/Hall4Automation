const mongoose = require("mongoose")

const residentSchema = mongoose.Schema({
    RollNumber:
    {
        type:Number,
        required:true
    },
    StudentName:
    {
        type:String,
        required:true
    }
    // },
    // RoomNumber:
    // {
    //     type:String,
    //     required:true
    // },
    // EmailID:
    // {
    //     type:String,
    //     required:true
    // }


},{
    timestamps:true,
})

const residentModel=mongoose.model('residents',residentSchema)
module.exports=residentModel
