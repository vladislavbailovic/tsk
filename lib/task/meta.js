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
				return tsk.data.is_valid_date(value) ? value : tsk.date.fmt();
			case "assigned":
				return value || '';
			case "creator":
				return value || 've@incsub.com';
			case "followers":
				value = tsk.data.is_valid_array(value, tsk.data.is_valid_user)
					? value
					: tsk.data.csv_to_valid_array(value, tsk.data.is_valid_user)
				;
				return value || [];
		}
		return false;
	};

	return Task;
};
