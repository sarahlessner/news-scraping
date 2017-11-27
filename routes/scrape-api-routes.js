
var request = require("request");
var cheerio = require("cheerio");
var Comments = require("./../models/comments.js");
var Articles = require("./../models/articles.js");

module.exports = function(app) {
  // Scrape data from buzzfeed and display results direct from scrape on the page load
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
              var trimTitle = $(element).find($(".lede__title")).text();
              trimTitle = trimTitle.trim();
              //it appears one element with class of lede did not contain a link -- this checks that there is one
              if(!getLink)
                return;

              // save article info to result object
              result.latest = "active-page";
              result.archive = "active-page";
              result.title = trimTitle;
              result.link = getLink;
              result.summary = $(element).find($(".lede__kicker")).text();
              //some article displays had different image classes
              result.img = $(element).find($(".bf_dom")).attr("rel:bf_image_src") ||
              $(element).find($(".lede__image")).attr("src");


              var article = new Articles(result);

              article.save(function(err, doc) {
                // Log any errors
                if (err) {
                  return console.log(err);
                }
                // Or log the doc
                else {
                  console.log(doc);
                }
              });

              allResults.push(result);

          });
      //
      // console.log(allResults);
      for(var i = 0; i < allResults.length; i++)
        allResults[i]["idnum"] = i;
      var hbsObject = {
        articles: allResults
      };
      res.render("index", hbsObject);
      // res.send(results);

    });
    // res.redirect("/");
  });
  //archive page - gets all articles from the database, sorts by date :)
  app.get("/archive", function(req, res) {
    Articles.find({}).sort({"createdAt": -1})
    .exec(function(error, results) {
    // Log any errors
      if (error) {
        // console.log(error);
      }
      // Or send the doc to the browser as a json object
      else {
        console.log(results.length);
        for(var i = 0; i < results.length; i++) {
          results[i]["idnum"] = i;
        }
        var hbsObject = {
          articles: results
        };
        res.render("index", hbsObject);
      }
    });
  //app.get end
  });

  //post comments

  app.post('/comments/:title', function(req, res){
    // console.log("req.body from app post comments title YES YES YES", req.body);
    // console.log("req.params from app post", req.params);
    var comment = new Comments(req.body);
    comment.save(function(error, doc) {
      // Log any errors
      if (error) {
        // console.log(error);
      }
      // Otherwise
      else {
        console.log("COMMENTS NEW DOC", doc._id);
        // Use the article id to find and update it's note
        Articles.findOneAndUpdate({"title": req.params.title }, { $push: { "comments": doc._id } }, { new: true })
        .exec(function(err, newdoc) {
        // Send any errors to the browser
        if (err) {
          console.log("err");
          res.send(err);
        }
        // Or send the newdoc to the browser
        else {
          console.log("newdoc", newdoc);
          res.send(newdoc);
        }
      });
      }
    });
  });
  //display comments
  app.get('/comments/:title', function(req, res) {

    console.log(req.params.title);
    Articles.findOne({"title": req.params.title})
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
  //delete comments
  app.delete("/comments/delete/:id", function(req, res) {
      Comments.remove({"_id": req.params.id})
      .exec(function(error, doc) {
        // Send any errors to the browser
        if (error) {
          res.send(error);
        }
        // Or send the doc to the browser
        else {
          console.log("doc", doc);
          res.send(doc);
        }
      });
  });

}
