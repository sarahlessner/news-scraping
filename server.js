var express = require("express");
var mongoose = require("mongoose");
var path = require('path');
var bodyParser = require("body-parser");

mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3032;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// mLab database
// mongoose.connect("mongodb://heroku_4r7szb14:edc210mrggo2vrlpj7jr1ni8bo@ds129144.mlab.com:29144/heroku_4r7szb14", function(err) {
// 	if(err) throw err;
// 	console.log('database connected');
//   });

// Local Database Configuration with Mongoose
mongoose.connect("mongodb://localhost/articlescraper");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});



// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/scrape-api-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
