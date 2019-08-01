// Dependencies for API Routes
const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken');

// Sets User Model to require User model
const User = require("../../models/User")

// @route   Post api/Users
// @desc    Register new User
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }

    // Check for existing user 
    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({ msg: "User already exists"});

        // If no user create new user
        const newUser = new User({
            name,
            email,
            password
        });

        // Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                // hash the password then save to database
                newUser.password = hash;
                // Save to database
                newUser.save()
                .then(user => {

                    // JWT webtoken added here
                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        //optional expiration
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }

                            })
                        }
                    )
                });
            });
        });
    });
});

module.exports = router;