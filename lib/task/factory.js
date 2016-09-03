var Task = require('./core');

module.exports = (function (Task) {

	/**
	 * Task factory loader
	 *
	 * @param {String} slug Base filename to load from
	 * @param {Function} cback Optional callback
	 *
	 * @return {Promise}
	 */
	Task.load = function (slug, cback) {
		var task = new Task();
		return task.load(slug, cback);
	};

	/**
	 * Task factory creator
	 *
	 * @param {String} slug New task slug
	 * @param {Object} data Data for task
	 * @param {Function} cback Optional callback
	 *
	 * @return {Promise}
	 */
	Task.create = function (slug, data, cback) {
		data = data || {};
		var task = new Task();
		task.populate(data);
		return task.save(slug, cback);
	};

	return Task;
})(Task);
