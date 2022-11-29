const bodyParser = require("body-parser");
const express = require("express");
const contacts = require("../models/contact");
const router = express.Router();
const { validateToken } = require("../Middlewares/AuthMiddleware");
const user = require("../models/user");


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
            status: "Success",
            contact
    
        });

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message : error.message
        })
    }
})
router.get("/username", validateToken, async (req, res) => {
    const data = await user.findOne({ _id: req.user });
    res.json(data);
  });
  
  router.get("/all", validateToken, async (req, res) => {
    try {
      const { page } = req.query;
  
      const data = await contacts
        .find({ userid: req.user })
        .skip((page - 1) * 10)
        .limit(10);
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  router.get("/alldata", validateToken, async (req, res) => {
    try {
      const data = await contacts.find({ userid: req.user })
      res.json(data);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


module.exports = router
