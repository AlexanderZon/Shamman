/**
 * Auditory
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
	tableName: 'sh_auditory',
	attributes: {
		id: 'INTEGER',
		user_id: 'INTEGER',
		action: 'JSON',
		status: 'STRING',
		type: 'STRING',
	},
};
