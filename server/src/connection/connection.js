const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/contactApp")
.then(console.log("Data_base connected successful"))
.catch(console.error);