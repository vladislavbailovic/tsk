var tsk = require('../util');

module.exports = function (Task) {

	var meta_list = [
		'created',
		'modified',
		'assigned',
		'creator',
		'followers'
	];

	/**
	 * Tests whether a value is a valid date format
	 *
	 * @param {String} value Value to test
	 *
	 * @return {Boolean}
	 */
	function is_valid_date (value) {
		return (value || '').match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
	}

	/**
	 * Tests whether a value is a valid array
	 *
	 * @param {Mixed} value Value to test
	 * @param {Function} callback Optional member callback check
	 *
	 * @return {Boolean}
	 */
	function is_valid_array (value, callback) {
		if (!(value instanceof Array)) return false;
		if (!callback) return true;

		return value.every(callback);
	}

	/**
	 * Gets validated meta property
	 *
	 * @param {String} key Property to get
	 *
	 * @return {Mixed} Validated property value
	 */
	Task.prototype.get_meta = function (key) {
		return this.get_valid_meta(key, (this.meta || {})[key]);
	};


	/**
	 * Fills in the meta blanks in a valid format
	 *
	 * @param {Object} meta Base meta
	 *
	 * @return {Object}
	 */
	Task.prototype.get_meta_object = function (meta) {
		meta = meta || {};

		meta_list.forEach(function (key) {
			meta[key] = this.get_valid_meta(key, meta[key]);
		}, this);

		return meta;
	};

	/**
	 * Validates property
	 *
	 * @param {String} key Property to validate
	 * @param {Mixed} value Property value to validate
	 *
	 * @return {Mixed} Validated property
	 */
	Task.prototype.get_valid_meta = function (key, value) {
		switch (key) {
			case "created":
			case "modified":
				return is_valid_date(value) ? value : tsk.date.fmt();
			case "assigned":
				return value || '';
			case "creator":
				return value || 've@incsub.com';
			case "followers":
				value = is_valid_array(value)
					? value
					: to_valid_array(value)
				;
				return value || [];
		}
		return false;
	};

	return Task;
};
