// Dependencies for API Routes
const express = require('express');
const router = express.Router();

// Sets Item model to require Item variable in the model folder
const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item.find() 
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route   Post api/items
// @desc    Create an Item request
// @access  Public
router.post('/', (req, res) => {
   const newItem = new Item({
       name: req.body.name
   });
   newItem.save().then(item => res.json(item));
});

// @route   Delete api/items/:id
// @desc    Delete Post item by ID
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id) 
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
})


// Exporting the router to be used in other folders
module.exports = router;