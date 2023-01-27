const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const {User} = require('../models/userModel');
const genAuthToekn = require("../utils/genAuthToken");

router.post("/", async (req, res) => {

    const schema = Joi.object({
        firstname: Joi.string().min(3).max(30).required(),
        lastname: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(3).max(200).required(),
    });

    const {error} = schema.validate(req.body)

    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(400).send("User already exist...");

    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save()

    const token = genAuthToekn(user)

    res.send(token)
    
});

module.exports = router;