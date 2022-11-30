const express = require("express");
const app = express();
const connect = require('./connection/connection');
const contactRoutes = require('./routes/userContact');
const signupRoutes = require("./routes/signUp")
const signinRoutes = require("./routes/signIn")
var jwt = require("jsonwebtoken");
const secret = "CONTACTAPI";


app.get("/" ,(req,res)=> {
    res.send("ok")
});
app.use("/contact", (req,res,next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization;
        if (token) {        
            jwt.verify(token, secret, function (err, decoded) {
                if(err){
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


app.use("/singup" , signupRoutes)
app.use("/singin" , signinRoutes)
app.use("/contact" ,contactRoutes);
app.listen(8000,()=> console.log("The server is up at 8000..."));