// ----- Requiring all Dependencies needed for the start of the application------//
const express = require("express");
//---- FYI: BodyParser is now apart of React so no need to require it anymore
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//--- Defines all api route requests
const items = require('./routes/api/items');

//---- Setting Express to a Variable called app ----//
const app = express();

//---- Adding body-parser Middleware ----//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//db congfiguration
const db = require('./config/keys').mongoURI;

//connect to db
mongoose
 .connect(db, {useNewUrlParser: true})
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.log(err));

// api Use Routes Defined
app.use('/api/items', items);


// Set the Port variable to the environment or localhost:5000 depending on dev environment
const PORT = process.env.PORT || 5000;

// Start port and log status
app.listen(PORT, () => console.log(`Server is started on port: ${PORT}`));
