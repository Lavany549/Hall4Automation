const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const path = require('path');
require("dotenv").config();

const app = express();

//middlewares
const corsOptions ={
  origin: "https://hall4-frontend.onrender.com"
}

const dbConfig = require('./DB');
const roomsRoute = require('./routes/RoomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingRoute = require('./routes/bookingRoute');
const residentsRoute = require('./routes/residentsRoute');
const commonroomsRoute=require('./routes/CommonRoomsRoute')


// app.use(express.static(path.join(__dirname+"/public")))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingRoute);
app.use('/api/residents', residentsRoute);
app.use('/api/commonrooms', commonroomsRoute);

const port = process.env.PORT || 5000;

app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error");
        }

        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});


app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });


app.listen(port, () => console.log('Node server started using nodemon',port));
