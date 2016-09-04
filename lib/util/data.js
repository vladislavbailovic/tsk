module.exports = {

	/**
	 * Tests whether a value is a valid date format
	 *
	 * @param {String} value Value to test
	 *
	 * @return {Boolean}
	 */
	is_valid_date: function (value) {
		return !!(value || '').match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
	},

	/**
	 * Tests if a value is a number
	 *
	 * @param {Mixed} value Value to test
	 *
	 * @return {Boolean}
	 */
	is_number: function (value) {
		return typeof 1 === typeof value;
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

	/**
	 * Checks if a value is a valid user format
	 *
	 * Format only, doesn't perform user existence check
	 *
	 * @param {String} value Value to check
	 *
	 * @return {Boolean}
	 */
	is_valid_user: function (value) {
		return !!(value || '').match(/^[-_a-z0-9]+?@\S+$/);
	},

	/**
	 * Explodes a comma-separated string into a validated array
	 *
	 * @param {String} value Value to convert to array
	 * @param {Function} validation_callback Optional validation callback
	 *
	 * @return {Array}
	 */
	csv_to_valid_array: function (value, validation_callback) {
		validation_callback = validation_callback || this.not_empty;
		var tmp = (value || '').split(/,/);

		if (0 === tmp.length) return [];
		return tmp.map(validation_callback).filter(this.not_empty);
	},

	/**
	 * Checks if value is non-empty
	 *
	 * @param {Mixed} val Value to check
	 *
	 * @return {Boolean}
	 */
	not_empty: function (val) {
		return !!val;
	}
};
