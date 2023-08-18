
const mongoose = require("mongoose");
const mongoUri = "mongodb://127.0.0.1:27017/cms"; // here for nodemon version-18 or above you need to
// do 127.0.0.1 or 0.0.0.0 instead of doing localhost
const connectToMongo = async () => {
  try {
    mongoose.connect(mongoUri);
    console.log("Connected to Mongo Succesfully");
  } catch (error) {
    console.log(error);
    process.exit();
  } 
};
module.exports = connectToMongo;
