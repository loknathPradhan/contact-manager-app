const bodyParser = require("body-parser");
const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();
// const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/contact", async (req, res) => {
    try {

        let contactArray = req.body;
        contactArray.forEach(element => {

            const { name, designation, company, industry, email, phone, country } = element;

            let contact =  Contact.create({
                name: name,
                designation: designation,
                company: company,
                industry: industry,
                email: email,
                phone: phone,
                country: country,
                user: req.user
            }, function (err, data) {if(err) {console.log(err)}});
        });

        res.json({
            status: "Success",
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
});


router.delete("/contact", async (req, res) => {

    try {

        let deletArray = req.body;
        if (deletArray.length > 0) {
            deletArray = deletArray.map((d) => mongoose.Types.ObjectId(d));
            const contact = await Contact.deleteMany({ _id: { $in: deletArray } });
            res.json({
                status: 'success',
                contact
            })
        }
        else {
            const contact = await Contact.deleteMany();
            res.json({
                status: 'success',
                contact
            })
        }

    } catch (error) {
        res.status(500).json({
            status: 'Failed',
            message: error.message
        })
    }
})
router.get("/contact", async (req, res) => {
    try {
        const contact = await Contact.find({user: req.user});
        res.send(({ message: "sucessfully saved",contact: contact }));
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})
router.get("/contact", async (req, res) => {
    try {
        const contact = await Contact.find({user: req.user});
        res.send(({ message: "sucessfully saved",contact: contact }));
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})



module.exports = router
