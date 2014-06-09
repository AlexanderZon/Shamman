/**
 * Properties
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_properties',
	attributes: {
		id: {
			type: 'STRING',
		},
		symptom_id: {
			type: 'STRING',
		},
		title: {
			type: 'STRING',
			unique: true
		},
		description: {
			type: 'TEXT',
		},
		user_id: {
			type: 'INTEGER',
		},
	},
};
