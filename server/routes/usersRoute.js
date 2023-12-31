const express = require("express");
const router = express.Router();

const User=require('../models/user');
const Resident = require('../models/residents');

router.post("/register", async(req,res)=>{
    
    const { name, email, rollnum, password } = req.body;

    try {
        const isResident = await Resident.findOne({ RollNumber: rollnum });

        console.log('isResident:', isResident);

        const newuser = new User({
            name,
            email,
            rollnum,
            password,
            isResident: !!isResident, // Set isResident based on the result
            isAdmin: false
        });

        const user = await newuser.save();
        res.send('User Registered Successfully')
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});
router.post("/login", async(req,res)=>{
    const {email,password}=req.body
    
    try {
        const user= await User.findOne({email:email,password:password})
        if(user)
        {
            const tempuser={
                name:user.name,
                email:user.email,
                rollnum:user.rollnum,
                isAdmin:user.isAdmin,
                isResident:user.isResident,
                _id:user._id
            }
            res.send(tempuser)
        }
        else{
            return res.status(400).json({message:'Login Failed'})
        }
        
        
    } catch (error) {
        return res.status(400).json({messsage: error});
        
    }

});
router.post("/checkuser", async (req, res) => {
    const { rollnum, email } = req.body;

    try {
        const userWithSameRollNum = await User.exists({ rollnum });
        const userWithSameEmail = await User.exists({ email });

        res.json({ exists: userWithSameRollNum || userWithSameEmail });
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



module.exports=router;