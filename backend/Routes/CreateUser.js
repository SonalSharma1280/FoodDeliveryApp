const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const jwtSecret="MyNameisSonalSharma1234";


router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', "Incorrect password").isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt=await bcrypt.genSalt(10);//salt is made up of random bits added to each password instance before its hashing
        let securepswd=await bcrypt.hash(req.body.password,salt);//explanation at bottom
        try {
            await User.create({
                name: req.body.name,
                password: securepswd,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });

        }


    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 })], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "login with correct credentials" });
            }
            const pswdcompare=await bcrypt.compare(req.body.password,userData.password);
            if (!pswdcompare) {
                return res.status(400).json({ errors: "login with correct credentials" });
            }
            const data={
                user:{
                    id:userData.id
                }                              
            }
            const authToken=jwt.sign(data,jwtSecret)
            return res.json({ success: true,authToken:authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });

        }

    })


module.exports = router;

/*
In bcrypt, a widely used password hashing algorithm
"salt" refers to a random value that is added to the input before hashing. 
The salt is then stored together with the hash in the password database.
The purpose of using a salt is to add randomness and increase the security of the hashed password.

hash" refers to the output of the algorithm after it has processed the input password and salt. 
The resulting hash is a fixed-length string of characters that is stored in the password database.

When a user logs in, their input password is hashed using the same salt and cost factor as when the password was originally hashed.
 The resulting hash is then compared with the stored hash in the password database. 
 If they match, the login is considered valid.



 */