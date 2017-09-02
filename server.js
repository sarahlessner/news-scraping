var express = require("express");
var mongojs = require("mongojs");
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


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/html-routes.js")(app);
require("./routes/scrape-api-routes.js")(app);


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
