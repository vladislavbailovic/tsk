var util = {

	slug_to_pathspec: function (slug) {
		return (slug || '').replace(/[^-_a-z0-9]/g, '-') + '.yml';
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
