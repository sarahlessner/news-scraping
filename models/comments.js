var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	name: {
		type: String
	},
	comment: {
		type: String
	}
});

var Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
