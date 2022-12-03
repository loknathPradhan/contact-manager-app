const express = require("express");
const app = express();
const connect = require('./connection/connection');
const contactRoutes = require('./routes/userContact');
const signupRoutes = require("./routes/signUp")
const signinRoutes = require("./routes/signIn")
var jwt = require("jsonwebtoken");
const secret = "CONTACTAPI";

const cors = require('cors');
app.use(cors());

// --------------------providing authorization -----------------------
app.get("/" ,(req,res)=> {
    res.send("ok")
});
app.use("/contact", (req,res,next) => {
    // console.log("hello form verify")
    // console.log(req.headers.auth);
    if (req.headers.auth) {
        const token = req.headers.auth;
        // console.log(token)
        if (token) {        
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
                    console.log("form error")
                    return res.status(403).json({
                        status: "failed",
                        message: "Invalid token"
                    })
                }
                req.user = decoded.data;
                next();
            });
        } else {
            return res.status(403).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    }else {
        return res.status(403).json({ status: "Failed", 
        message : "Not authenticated user"});
    }
});


app.use("/signup" , signupRoutes)
app.use("/signin" , signinRoutes)
app.use("/contact" ,contactRoutes);
app.listen(8000,()=> console.log("The server is up at 8000..."));