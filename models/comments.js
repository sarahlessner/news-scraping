var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	articleId: {
		type: String
	},
	name: {
		type: String
	},
	comment: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

var Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
