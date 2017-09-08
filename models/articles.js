var mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
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
  },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Articles = mongoose.model("Articles", articleSchema);

module.exports = Articles;
