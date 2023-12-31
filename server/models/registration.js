const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  studentRollNumber: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    required: true,
  },
  logoutTime: {
    type: Date,
    required: true
  },
  daysLoggedIn:{
    type:Number,
    required:true
  }
},{
    timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
