const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	article: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'News',
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Comment', commentSchema);
