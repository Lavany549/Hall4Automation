const mongoose=require("mongoose");
const cron = require('node-cron');
require("dotenv").config();
const path = require('path');
var mongoURL=process.env.MONGO_DB_URL;
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
var connection=mongoose.connection;
connection.on('error',()=>{
    console.log("MonogDB connection failed")
})

connection.on('connected',()=>{
    console.log("MonogDB connected!!")
})



// cron.schedule('0 0 * * *', () => {
//     // Run the updateRooms script
//     const updateRoomsPath = path.join(__dirname, 'routes/RoomsRoute.js/updateRooms');
//     require(updateRoomsPath);
// });



module.exports=mongoose;