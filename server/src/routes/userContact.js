const bodyParser = require("body-parser");
const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();


router.use(bodyParser.json());

router.post("/post", async (req,res) => {
    try {
        
        // console.log(req.body)
        const {name,designation,company,industry,email,phone,country}=req.body;
        const contact = await Contact.create({
            name: name,
            designation: designation,
            company: company,
            industry: industry,
            email: email,
            phone: phone,
            country: country,
            // user: req.user
        });
        res.json({
            status: "Sucess",
            contact
    
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message : error.message
        })
    }
})


module.exports = router
