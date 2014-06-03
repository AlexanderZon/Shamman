/**
 * DatasheetMeta
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_datasheet_meta',
	attributes: {
		id: 'INTEGER',
		datasheet_id: 'INTEGER',
		meta_key: 'STRING',
		meta_value: 'TEXT',
	},
};
