var yaml = require('yamljs'),
	fs = require('fs'),
	Remarkable = require('remarkable'),

	cmark = new Remarkable(),
	tsk = require('./util')
;

var Task = function () {

	this.slug = '';

	this.meta = {};
	this.task = '';
	this.discussion = [];

	this.populate = function (data) {
		data = data || {};

		this.meta = this.get_valid_meta(data.meta || {});
		this.task = data.task || '';
		this.discussion = data.discussion || [];
	};

	/**
	 * Fills in the meta blanks in a valid format
	 *
	 * @param {Object} meta Base meta
	 *
	 * @return {Object}
	 */
	this.get_valid_meta = function (meta) {
		meta = meta || {};

		meta.created = meta.created || tsk.date.fmt();
		meta.modified = meta.modified || tsk.date.fmt();
		meta.assigned = meta.assigned || '';
		meta.creator = meta.creator || 've@incsub.com';
		meta.followers = meta.followers || [meta.creator];

		return meta;
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

	/**
	 * Gets task main HTML
	 *
	 * @return {String}
	 */
	this.get_html = function () {
		var raw = this.task || '';
		return cmark.render(raw);
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