const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");

// @route   GET api/todos/test
// @desc    Test the todos route
// @access  Public
router.get("/test", (req, res) => {
  res.send("ToDo route working");
});

// @route   POST api/todos/new
// @desc    Create a new todo
// @access  Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { errors, isValid } = validateToDoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newToDo = new ToDo({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    // save the new todo
    await newToDo.save();

    return res.json(newToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

// @route   GET api/todos/current
// @desc    Get the current users todos
// @access  Private
router.get("/current", requiresAuth, async (req, res) => {
  try {
    const completeToDos = await ToDo.find({
      user: req.user._id,
      complete: true,
    });

    const incompleteToDos = await ToDo.find({
      user: req.user._id,
      complete: false,
    });

    return res.json({ complete: completeToDos, incomplete: incompleteToDos });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

module.exports = router;
