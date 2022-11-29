const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const userSchema = new Schema({
    email: {type: String, unique : true, required: true},
    password: {type: String}
 }, {timestamps : true})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
