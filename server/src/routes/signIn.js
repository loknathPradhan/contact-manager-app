const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("./userContact");
const secret = "CONTACTAPI";

const cors = require('cors');
router.use(cors());

router.use(bodyParser.json());
router.post("/", async (req, res) => {
    try {
        const {email, password} = req.body;
        // console.log(email, password)
        let user = await User.findOne({email});
        if(!user) {
            return res.json({
                status: "Failed",
                message: "Email does not exists kindly register first"
            }).status(401);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.json({
                    status: "Failed",
                    message: err.message
                }).status(500);
            }
            if (result) {
                const jwt_token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                //   console.log(user._id)
                res.json({
                    status: "Sucess",
                    message: "Login successful",
                    jwt_token,
                    userid: user._id
                    
                }).status(200);
            } else {
                res.json({
                    status: "Falied",
                    message: "Invalid credentials !! Please provide correct user id/password"
                }).status(400);
            }
        });
    } catch (error) {
        res.json({
            status: "failed",
            message: e.message
        }).status(500)
    }
})
module.exports = router;