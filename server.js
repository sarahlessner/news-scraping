var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//for scraping
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

var PORT = process.env.PORT || 3032;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

//mongo heroku: mongolab-vertical-89248

//MONGODB_URI: mongodb://heroku_4r7szb14:edc210mrggo2vrlpj7jr1ni8bo@ds129144.mlab.com:29144/heroku_4r7szb14

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/scrape-api-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
