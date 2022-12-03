const bodyParser = require("body-parser");
const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();
// const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require('cors');
router.use(cors());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/contact", async (req, res) => {
    try {

        let contactArray = req;
        console.log("inside post")
        // console.log(contactArray)
        // contactArray.forEach(element => {

        //     const { name, designation, company, industry, email, phone, country } = element;

        //     let contact =  Contact.create({
        //         name: name,
        //         designation: designation,
        //         company: company,
        //         industry: industry,
        //         email: email,
        //         phone: phone,
        //         country: country,
        //         user: req.user
        //     }, function (err, data) {if(err) {console.log(err)}});
        // });

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
            const contact = await Contact.deleteMany({$and:[{ _id: { $in: deletArray } },{user: req.user}]});
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
router.get("/:id", async (req, res) => {
    // console.log(req.params.id)
    console.log("inside get request")
    try {
        const datas = await Contact.find({user: req.user});
        res.send(({ message: "sucessfully saved",data: datas }));
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})
router.get("/contact/:email", async (req, res) => {
    try {
        const contact = await Contact.findOne({$and : [{email: req.params.email},{user: req.user}]});
        res.send(({ message: "sucessfully saved",contact: contact }));
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        })
    }
})



module.exports = router
