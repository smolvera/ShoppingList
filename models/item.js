// Require mongoose dependency 
const mongoose = require("mongoose");
// Define schema and set it to create a new mongoose.schema 
const Schema = mongoose.Schema;

// Create Item Schema model
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//export the item schema for use in other files
module.exports = Item = mongoose.model("item", ItemSchema);