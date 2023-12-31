const express = require("express");
const router = express.Router();
const moment = require('moment');
const Room=require('../models/commonRooms');
const Registration = require('../models/registration');

router.get("/getallrooms", async(req,res)=>{
    try {
        const rooms = await Room.find({});
        // return res.json({rooms});
        res.send(rooms);
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});

// POST endpoint for handling login
router.post('/login', async (req, res) => {
    try {
        const updatedRooms = req.body.room;
        console.log("updated rooms",updatedRooms);
        
        const room=   await Room.findOneAndUpdate(
                { _id: updatedRooms._id }, // Replace with the appropriate identifier for your documents
                updatedRooms
                
            );

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error updating commonrooms on login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.post('/logout', async (req, res) => {
    try {
      const { room } = req.body;
      console.log(room);
  
      // Assuming room has properties like _id, available, etc. Modify it according to your actual Room model
      const roomId = room._id;
      const loginTime = new Date(room.loginTime);
      const logoutTime = new Date();
  
      // Calculate the duration in milliseconds
      const durationInMillis = logoutTime - loginTime;
  
      // Calculate days
      const daysLoggedIn = durationInMillis / (1000 * 60 * 60 * 24);
  
      // Create a new registration
      const registration = new Registration({
        roomName: room.name,
        roomId,
        studentName: room.studentName,
        studentRollNumber: room.StudentRollNumber,
        loginTime,
        logoutTime,
        daysLoggedIn
      });
  
      // Save the registration to MongoDB
      await registration.save();
  
      // Update the room in MongoDB
      await Room.findByIdAndUpdate(roomId, {
        available: true,
        studentName: '',
        StudentRollNumber: '',
        loginTime: '',
        logoutTime: '',
      });
  
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

module.exports=router;