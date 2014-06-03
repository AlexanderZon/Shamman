/**
 * Users
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
 	tableName: 'sh_users',
	attributes: {
	  	id: 'INTEGER',
		login: {
			type: 'STRING',
			required: true,
		},
		pass: {
			type: 'STRING',
			required: true,
		},
		email: {
			type: 'email',
			required: true,
		},
		display_name: {
			type: 'STRING',
			required: true,
		},
		status: {
			type: 'STRING',
			defaultsTo: 'draft',
		},
		type: {
			type: 'STRING',
			defaultsTo: 'client',
		},
	},
	/*beforeCreate: function(values, next) {
		var bcrypt = require('bcrypt');
		bcrypt.hash(values.password, 10, function(err, hash) {
			if(err) return next(err);
			values.password = hash;
			next();
		});
	},*/
	beforeCreate: function(user, cb) {
	    bcrypt.genSalt(10, function(err, salt) {
	        bcrypt.hash(user.pass, salt, function(err, hash) {
	        	if (err) {
	            	console.log(err);
	          		cb(err);
	        	}
	        	else{
	          		user.pass = hash;
	          		cb(null, user);
	        	}
	      	});
	    });
	},
};