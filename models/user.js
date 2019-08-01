// Require all dependencies
const mongoose = require('mongoose');
// Set schema to mongoose.schema
const Schema = mongoose.Schema;

//Create User Schema model
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registered_date: {
        type: Date,
        default: Date.now
    }
});

// export UserSchema for use in other files
module.exports = User = mongoose.model("user", UserSchema);