const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// @route   GET api/auth/test
// @desc    Test the auth route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

// @route   POST api/auth/register
// @desc    Create a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // create new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    // save the user to the database
    const savedUser = await newUser.save();

    // return the new user
    return res.json(savedUser);
  } catch (err) {
    console.log(err);

    res.status(500).send(err.message);
  }
});

module.exports = router;
