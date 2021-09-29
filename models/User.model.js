const {
	Schema,
	model
} = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	savedOrganizations: [{
		type: Schema.Types.ObjectId,
		ref: 'Organization',
		default: []
	}]
});

const User = model('User', userSchema);

module.exports = User;