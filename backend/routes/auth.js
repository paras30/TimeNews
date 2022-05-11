const express = require("express");
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_TKL = "shreyisveryhard";



//Route 1: create user using : POST "/api/auth/createuser"  . doesn't require login 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 5 charcter.').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    // If there are errors , return and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // check wether the user with the same email
    try {


        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "sorry a user with this email is already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_TKL);

        success = true;
        res.json({ success, authtoken })
        //      .then(user => res.json(user))
        //      .catch(err => {console.log(err)
        //     res.json({error : 'please enter the unique email address',message: err.message})})


    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }
})


//Route2: Authentication of user  : POST "/api/auth/login"  . doesn't require login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;

    // If there are errors , return and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }



    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success,error: "please try to login correct credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "please try to login correct credentials." });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_TKL);
        success =true;
        res.json({ success,authtoken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }


});

//Route 3: Get user details using POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {


    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }
});

module.exports = router