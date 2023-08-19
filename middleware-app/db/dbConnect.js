const mongoose = require("mongoose");
// set mongoDB URL in the .env file
require("dotenv").config();

// create an async functionto connect app to database on mongoDB
async function dbConnect() {
  mongoose
    // connect to URL stated in .env file
    .connect(process.env.DB_URL)
    // if successful then send message to console
    .then(() => {
      console.log("Sucessfully connected to MongoDB Atlas");
    })
    // if error send error message to console
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas");
      console.error(error);
    });
}

// export dbConnect module
module.exports = dbConnect;
