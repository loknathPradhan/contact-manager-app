const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cors = require('cors');
router.use(cors());

const secret = "CONTACTAPI";
router.use(bodyParser.json());
router.post("/", async (req,res) => {
    try {
        const {email, password} = req.body;
        console.log(email, password)
        
        let user = await User.findOne({email});
        if(user) {
            return res.json({
                status: "Failed",
                message: "Email already exists"
            }).status(401);
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
            }).status(200);
        })
    } catch (error) {
        res.json({
            status: "Failed",
            message: error.message
        }).status(500);
    }
})
module.exports = router;