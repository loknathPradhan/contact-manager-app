const express = require("express");
const app = express();
const connect = require('./connection/connection');

app.get("/" ,(req,res)=> {
    res.send("ok")
});
app.listen(8000,()=> console.log("The server is up at 8000..."));