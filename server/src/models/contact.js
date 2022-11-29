const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: String,
    designation: String,
    company: String,
    industry: String,
    email: {type: String, unique : true},
    phone: Number,
    country: String
    // user : {type: Schema.Types.ObjectId, ref: "User"}
})

const contactModel = mongoose.model("Contact", contactSchema);
module.exports = contactModel;