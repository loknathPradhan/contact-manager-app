const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("./userContact");
const secret = "CONTACTAPI";
router.use(bodyParser.json());
router.post("/", async (req, res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                status: "Failed",
                message: "Email does not exists kindly register first"
            });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).json({
                    status: "Failed",
                    message: err.message
                });
            }
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                res.status(200).json({
                    status: "Sucess",
                    message: "Login successful ",
                    token
                });
            } else {
                res.status(401).json({
                    status: "Falied",
                    message: "Invalid credentials !! Please provide correct email/password"
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: e.message
        })
    }
})
module.exports = router;