var Filters = {
	filter: function (key, value) {
		var str = '^\\s*' + key + ":\\s*" + value;
		return new RegExp(str, 'm');
	}
};

Filters.NOBODY = '[\'"\\s]+$';
Filters.ANYBODY = '[\'"]?[^\'"]+[\'"]?\\s*$';
Filters.EMPTY_LIST = '\\[\\]';
Filters.NON_EMPTY_LIST = '\\[[^\\]]+\\]';

module.exports = Filters;
