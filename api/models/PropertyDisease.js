/**
 * PropertyDisease
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_property_disease',
	attributes: {
		id: 'STRING',
		disease_id: 'STRING',
		property_id: 'STRING',
		user_id: 'STRING'
	},
};
