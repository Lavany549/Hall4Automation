const mongoose=require("mongoose");
const roomSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    maxcount:{
        type: Number,
        required: true
    },
    rentPerDay1:{
        type: Number,
        required: true
    },
    rentPerDay2:{
        type: Number,
        required: true
    },
    Amenities:{
        type: String,
        required: true
    },
    currentBookings: [{ date: { type: String } }],


},{
    timestamps: true,
})
const roomModel=mongoose.model('rooms',roomSchema)
module.exports=roomModel