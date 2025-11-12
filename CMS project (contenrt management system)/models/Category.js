const mongoose = require('mongoose');
const slugify = require('slugify');

// Category schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
},

{
	// Enable automatic `createdAt` and `updatedAt` fields
	timestamps: true,
});

// Generate slug from name before saving. Call next() to continue the middleware chain.
categorySchema.pre('validate', function (next) {
	this.slug = slugify(this.name, { lower: true,});
	next();
});

module.exports = mongoose.model('Category', categorySchema);



