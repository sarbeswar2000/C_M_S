const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
 email:{
    type:String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});
const admin = mongoose.model("admin", adminSchema);

module.exports = admin;