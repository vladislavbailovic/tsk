var sprintf = require('sprintf').sprintf;

module.exports = {
	fmt: function (timestamp) {
		timestamp = timestamp || Date.now();
		var dt = new Date(timestamp);
		return '' +
			dt.getUTCFullYear() + '-' +
			sprintf('%02d', dt.getUTCMonth()) + '-' +
			sprintf('%02d', dt.getUTCDate()) +
			'T' +
			sprintf('%02d', dt.getUTCHours()) + ':' +
			sprintf('%02d', dt.getUTCMinutes()) + ':' +
			sprintf('%02d', dt.getUTCSeconds()) +
		'Z';
	},
	parse: function (str) {
		var matches = (str || '').match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z?$/),
			date = new Date()
		;
		if (!matches || matches.length < 7) return NaN;

		date.setUTCFullYear(parseInt(matches[1], 10));
		date.setUTCMonth(parseInt(matches[2], 10));
		date.setUTCDate(parseInt(matches[3], 10));

		date.setUTCHours(parseInt(matches[4], 10));
		date.setUTCMinutes(parseInt(matches[5], 10));
		date.setUTCSeconds(parseInt(matches[6], 10));

		return date.getTime(str);
	}
};
