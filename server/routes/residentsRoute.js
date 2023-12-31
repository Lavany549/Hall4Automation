const express = require("express");
const router = express.Router();
const moment = require('moment');
const Residents=require('../models/residents');

router.get("/getallresidents", async(req,res)=>{
    try {
        const residents = await Residents.find({});
        // return res.json({rooms});
        res.send(residents);
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});
router.get('/findresident', async (req, res) => {
    try {
     
      const rollnum = req.query.rollnum;
      // console.log("1",rollnum);
      // Assuming you have a field named userId in your Booking model
      const student = await Residents.find({ RollNumber: rollnum });
      // console.log("yes",student)
      res.send(student);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

module.exports=router;