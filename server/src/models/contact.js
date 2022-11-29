const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: String,
    Designation: String,
    company: String,
    industry: String,
    email: {type: String, unique : true},
    phone: Number,
    country: string,
    user : {type: Schema.Types.ObjectId, ref: "User"}
})

const contactModel = mongoose.model("Contact", contactSchema);
module.exports = contactModel;