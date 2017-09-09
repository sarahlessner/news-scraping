
var request = require("request");
var cheerio = require("cheerio");
var Comments = require("./../models/comments.js");
var Articles = require("./../models/articles.js");

module.exports = function(app) {

  app.get("/archive", function(req, res) {
    Articles.find({}, function(error, results) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
          var hbsObject = {
            articles: results
          };
          res.render("index", hbsObject);
    }
    });

  //app.get end
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
  app.get("/", function(req, res) {
    // Make a request for the news section of ycombinator
    request("https://www.buzzfeed.com/entertainment", function(error, response, html) {
          // Load the html body from request into cheerio
          var $ = cheerio.load(html);
          //will store each result object
          var allResults = [];

            $(".lede").each(function(i, element) {
              //empty object to store article title, link etc
              var result = {};
              //find the link for each article (.lede class)
              var getLink = $(element).children("a").attr("href");
              //it appears one element with class of lede did not contain a link -- this checks that there is one
              if(!getLink)
                return;

              // save article info to result object
              result.title = $(element).find($(".lede__title")).text();
              result.link = "https://www.buzzfeed.com" + getLink;
              result.summary = $(element).find($(".lede__kicker")).text();
              //some article displays had different image classes
              result.img = $(element).find($(".bf_dom")).attr("rel:bf_image_src") ||
              $(element).find($(".lede__image")).attr("src");

              var article = new Articles(result);

              article.save(function(err, doc) {
                // Log any errors
                if (err) {
                  console.log(err);
                }
                // Or log the doc
                else {
                  console.log(doc);
                }
              });

              allResults.push(result);

          });
      //
      // console.log(results);
      var hbsObject = {
        articles: allResults
      };
      res.render("index", hbsObject);
      // res.send(results);

    });
    // res.redirect("/");
  });

  //post comments

  app.post('/comments/:id', function(req, res){
    var comment = new Comments(req.body);
    comment.save(function(error, doc) {
      // Log any errors
      if (error) {
        console.log(error);
      }
      // Otherwise
      else {
        // Use the article id to find and update it's note
        Articles.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": doc._id } }, { new: true },
        function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          res.send(newdoc);
        }
      });
      }
    });
  });
  //display comments
  app.get('/comments/:id', function(req, res) {
    Article.findOne({ "_id": req.params.id })
    // ..and on top of that, populate the notes (replace the objectIds in the notes array with bona-fide notes)
    .populate("comments")
    // Now, execute the query
    .exec(function(error, doc) {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      }
      // Or send the doc to the browser
      else {
        res.send(doc);
      }
    });
  });

}
