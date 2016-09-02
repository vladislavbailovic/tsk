var yaml = require('yamljs'),
	fs = require('fs'),
	Remarkable = require('remarkable'),

	cmark = new Remarkable(),
	tsk = require('../util')
;

var Task = function () {

	this.slug = '';

	this.meta = {};
	this.task = '';
	this.discussion = [];

	this.populate = function (data) {
		data = data || {};

		this.meta = this.get_meta_object(data.meta || {});
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

module.exports = Task;
