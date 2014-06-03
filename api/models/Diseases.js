/**
 * Diseases
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_diseases',
	attributes: {
		id: 'INTEGER',
		content: 'STRING',
		description: 'TEXT',
		date: 'DATE',
		time: 'TIME',
		user_id: 'INTEGER',
	},
};
