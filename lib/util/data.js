module.exports = {

	/**
	 * Tests whether a value is a valid date format
	 *
	 * @param {String} value Value to test
	 *
	 * @return {Boolean}
	 */
	is_valid_date: function (value) {
		return (value || '').match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
	},

	/**
	 * Tests whether a value is a valid array
	 *
	 * @param {Mixed} value Value to test
	 * @param {Function} validation_callback Optional member callback check
	 *
	 * @return {Boolean}
	 */
	is_valid_array: function (value, validation_callback) {
		if (!(value instanceof Array)) return false;
		if (!validation_callback) return true;

		return value.every(validation_callback);
	},

	csv_to_valid_array: function (value, validation_callback) {
		validation_callback = validation_callback || String.prototype.trim;
		var tmp = (value || '').split(/,/);

		if (0 === tmp.length) return [];
		return tmp.filter(validation_callback);
	}
};
