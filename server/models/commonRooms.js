const mongoose=require("mongoose");
const commonroomSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    available:{
        type: Boolean,
        required: true
    },
    studentName:{
        type: String,
       
    },
    StudentRollNumber:{
        type: String,
        
    },
    loginTime:{
        type: Date,
        
    },
    logoutTime:{
        type: Date,
       
    }
   

},{
    timestamps: true,
})
const commonroomModel=mongoose.model('commonrooms',commonroomSchema)
module.exports=commonroomModel