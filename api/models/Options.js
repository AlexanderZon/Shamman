/**
 * Options
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_options',
	attributes: {
		id: 'INTEGER',
		key: {
			type: 'STRING',
			required: true,
		},
		value: {
			type: 'TEXT',
			required: true,
		},
	}
};
