// ----- Requiring all Dependencies needed for the start of the application------//
const express = require("express");
const mongoose = require("mongoose");
// ---To handle file paths
const path = require('path');
const config = require('config');

//---- Setting Express to a Variable called app ----//
const app = express();

//---- Adding body-parser Middleware ----//
// app.use(bodyParser.urlencoded({ extended: true })); //no longer needed
app.use(express.json());

//db congfiguration
const db = config.get('mongoURI');

//connect to Mongo db
mongoose
 .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
    })// Adding new mongo url parser
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

// api Use Routes Defined
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static('/client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// Set the Port variable to the environment or localhost:5000 depending on dev environment
const port = process.env.PORT || 5000;

// Start port and log status
app.listen(port, () => console.log(`Server is started on port: ${port}`));
