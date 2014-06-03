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
		id: 'INTEGER',
		disease_id: 'INTEGER',
		property_id: 'INTEGER',
	},
};
