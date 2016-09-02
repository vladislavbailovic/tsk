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
	}
};
