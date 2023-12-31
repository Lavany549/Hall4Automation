const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  rollnum: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  numOfGuests: {
    type: String,
    required: true,
  },
  guestDetails: [
    {
      name: { type: String },
      age: { type: String },
      relation: { type: String },
      id: { type: String },
      // Assuming storing images as Buffer (Base64)
    },
  ],
  selectedRooms: [
    {
      roomName: { type: String },
      dates: [{ type: String }],
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  status:{
    type:String,
    required:true
  },
  paymentId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;
