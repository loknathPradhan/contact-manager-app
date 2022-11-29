const express = require("express");
const app = express();
const connect = require('./connection/connection');
const contactRoutes = require('./routes/userContact');

app.get("/" ,(req,res)=> {
    res.send("ok")
});

app.use("/contact" ,contactRoutes);
app.listen(8000,()=> console.log("The server is up at 8000..."));