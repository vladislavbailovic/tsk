var yaml = require('yamljs'),
	fs = require('fs'),
	tsk = require('./util')
;

var Task = function () {

	this.slug = '';

	this.meta = {};
	this.task = '';
	this.discussion = [];

	this.populate = function (data) {
		data = data || {};

		this.meta = data.meta || {};
		this.task = data.task || '';
		this.discussion = data.discussion || [];
	};

	/**
	 * Loads task data
	 *
	 * @param {String} fname Base filename to load from
	 * @param {Function} cback Optional callback
	 *
	 * @return {Promise}
	 */
	this.load = function (slug, cback) {
		var me = this;

		return new Promise(function (resolve, reject) {
			yaml.load(tsk.get_path(slug), function (data) {
				me.populate(data);
				me.slug = slug;
				if (cback) cback.apply(me);
				resolve(me);
			});
		});
	};

	/**
	 * Saves the current task data
	 *
	 * @param {String} slug Task slug
	 * @param {Function} cback Optional callback
	 *
	 * @return {Promise}
	 */
	this.save = function (slug, cback) {
		if (slug) this.slug = slug;
		var file = tsk.get_path(slug),
			data = yaml.stringify({
				meta: this.meta,
				task: this.task,
				discussion: this.discussion
			})
		;
		return new Promise(function (resolve, reject) {
			fs.writeFile(file, data, function (err) {
				if (err) reject(err, data);
				resolve(data);
			});
		});
	};
};

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

module.exports = Task;
