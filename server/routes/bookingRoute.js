const express = require("express");
const router = express.Router();
router.use(express.json());
const Booking = require('../models/booking');
const Room=require('../models/room');


router.post("/bookroom", async (req, res) => {
  const {
   
      userdetails,
      roomType,
      numOfGuests,
      guestDetails,
      selectedRooms,
      amount,
      paymentDetails,
   
  } = req.body;


  try {
    const newbooking = new Booking({
      userid: userdetails._id.toString(),
      rollnum: userdetails.rollnum,
      username: userdetails.name,
      roomType,
      numOfGuests,
      guestDetails,
      selectedRooms: selectedRooms.map(room => ({
        roomName: room.roomName,
        dates: room.dates,
      })),
      amount,
      status: paymentDetails.msg,
      paymentId: paymentDetails.paymentId,
      orderId: paymentDetails.orderId,
    });
    

    const booking = await newbooking.save();
    // Update dates in the rooms collection for each booked room
    if(booking.status === "success")
    {
      for (const room of selectedRooms) {
        // console.log(room);
        const dates = room.dates.map(date => ({ date }));
      
        await Room.updateOne(
          { name: room.roomName },
          { $push: { currentBookings: { $each: dates } } }
        );
      }

    }
   
    

    return res.status(201).json(booking);

  } catch (error) {
    return res.status(400).json({ message: error });
  }
});


router.get('/getuserbookings', async (req, res) => {
  try {
   
    const userId = req.query.userId;
    // Assuming you have a field named userId in your Booking model
    const userBookings = await Booking.find({ userid: userId });
    res.send(userBookings);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});
module.exports=router;
