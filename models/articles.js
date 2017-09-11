var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title: {
		type: String,
    required: true,
		unique: true
	},
	link: {
		type: String,
    required: true
	},
	summary: {
		type: String,
    required: true
	},
  img: {
    type: String,
    required: true

  },
	createdAt: {
		type: Date,
		default: Date.now
	},
  comments: [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Comments"
  }]
});

var Articles = mongoose.model("Articles", ArticleSchema);

module.exports = Articles;
