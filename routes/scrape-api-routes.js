
var request = require("request");
var cheerio = require("cheerio");

module.exports = function(app) {

  app.get("/", function(req, res) {

    res.send("hello world");
  });

  // Retrieve data from the db
  // app.get("/all", function(req, res) {
  //   // Find all results from the scrapedData collection in the db
  //   db.newscrape.find({}, function(error, found) {
  //     // Throw any errors to the console
  //     if (error) {
  //       console.log(error);
  //     }
  //     // If there are no errors, send the data to the browser as json
  //     else {
  //       res.json(found);
  //     }
  //   });
  // });

  // Scrape data from one site and place it into the mongodb db
  app.get("/scrape", function(req, res) {
    // Make a request for the news section of ycombinator
    request("https://www.buzzfeed.com/entertainment", function(error, response, html) {
          // Load the html body from request into cheerio
          var $ = cheerio.load(html);
          var results = [];
          // For each element with a "title" class
          // $(".summary-list .summary").each(function(i, element) {
          //   // Save the text and href of each link enclosed in the current element
          //   var title = $(element).find("a[title]").text();
          //   var link = $(element).find("a").attr("href");
          //   var summary = $(element).find($(".desc")).text();

            $(".lede").each(function(i, element) {
              // Save the text and href of each link enclosed in the current element
              var title = $(element).find($(".lede__title")).text();
              var link = $(element).children("a").attr("href");
              var summary = $(element).find($(".lede__kicker")).text();
              var img = $(element).find($(".bf_dom")).attr("rel:bf_image_src") ||
              $(element).find($(".lede__image")).attr("src");
        // Save these results in an object that we'll push into the results array we defined earlier
              results.push({
                title: title,
                link: "www.buzzfeed.com"+link,
                summary: summary,
                img: img
              });
            });
      //
      // // Log the results once you've looped through each of the elements found with cheerio
      console.log(results);
      var hbsObject = {
        articles: results
      };
      res.render("index", hbsObject);
      // res.send(results);

    });

    // Send a "Scrape Complete" message to the browser
  });

}
