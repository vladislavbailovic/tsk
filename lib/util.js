var util_date = require('./util/date');

var util = {

	date: util_date,

	slug_to_pathspec: function (slug) {
		return (slug || '').replace(/[^-_a-z0-9]/g, '-') + '.yml';
	},

	path_to_slug: function (path) {
		return (path || '').replace(/^.*\//g, '').replace(/\.yml$/, '');
	},

	get_root: function () {
		return '.tsk';
	},

	get_path: function (slug) {
		return [
			util.get_root(),
			util.slug_to_pathspec(slug)
		].join('/');
	}

};

module.exports = util;
