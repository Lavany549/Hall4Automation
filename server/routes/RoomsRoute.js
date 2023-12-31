const express = require("express");
const router = express.Router();
const moment = require('moment');
const Room=require('../models/room');

router.get("/getallrooms", async(req,res)=>{
    try {
        // const rooms = await Room.find({});
        const rooms = await Room.find().sort({ name: 1 });
        // return res.json({rooms});
        res.send(rooms);
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});

const updateRooms = async () => {
    try {
        // Step 1: Fetch all rooms
        const allRooms = await Room.find();

        // Step 2 and 3: Update each room
        const updatedRooms = await Promise.all(
            allRooms.map(async (room) => {
                // Filter out bookings whose date is before today
                const filteredBookings = room.currentBookings.filter(
                    (booking) => {
                        const bookingDate = moment(booking.date, 'DD MMM', true); // Parse date with format 'DD MMM'
                        return bookingDate.isSameOrAfter(moment(), 'day');
                    }
                );

                // console.log('Filtered Bookings:', filteredBookings);
                
                // Update the room with the modified currentBookings
                return Room.findByIdAndUpdate(
                    room._id,
                    { $set: { currentBookings: filteredBookings } },
                    { new: true }
                );
            })
        );

        console.log('Rooms updated successfully:', updatedRooms);
    } catch (error) {
        console.error('Error updating rooms:', error);
    }
};

// Call the function to update rooms
updateRooms();





module.exports=router;