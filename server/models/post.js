var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	text: String,
	username: String,
	created_at: {type: Date, default: Date.now}
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
