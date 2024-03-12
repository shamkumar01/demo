const mongoose = require("mongoose")
 require("dotenv").config();

 const connectDb = async ()=>{
        try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log("Database connect")
        }
        catch(error){
                console.log(`failed to connect ${error}`)
        }
 }
module.exports = connectDb;