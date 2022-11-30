const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "CONTACTAPI";
router.use(bodyParser.json());
router.post("/", async (req,res) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        if(user) {
            return res.status(401).json({
                status: "Failed",
                message: "Email already exists"
            })
        }
        bcrypt.hash(password, 10,async function(err, hash) {
            if(err) {
                return res.status(400).json({
                    status: "Failed",
                    message: err.message
                });
            }
            const user = await User.create({
                email,
                password: hash
            })
            return res.json({
                status: "success",
                message: "Registration succesful"
            })
        })
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})
module.exports = router;