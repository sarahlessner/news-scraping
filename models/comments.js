var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	// articleId: {
	// 	type: String
	// },
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
