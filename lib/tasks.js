var glob = require('glob'),
	fs = require('fs')
;

var tsk = require('./util'),
	Task = require('./task')
;

var Tasks = function () {

};

Tasks.get_all = function (file_callback) {
	return new Promise(function (resolve, reject) {
		if (!file_callback) resolve([]);

		glob(tsk.get_root() + '/**/*.yml', function (err, files) {
			if (err) reject(err);

			var prm = [],
				results = []
			;

			files.forEach(function (file) {
				prm.push(new Promise(function (rs, rj) {
					fs.readFile(file, 'utf8', function (err, data) {
						if (file_callback.apply(this, [data, file])) return rs(file);
						else rs();
					});
				}));
			});

			Promise.all(prm)
				.then(function (values) {
					(values || []).forEach(function (val) {
						if (!val) return true;

						var slug = tsk.path_to_slug(val);
						if (!val) return true;

						results.push(Task.load(slug));
					});
					Promise.all(results).then(function (done) {
						resolve(done);
					});
				})
				.catch(function () {
					reject();
				})
			;

		});
	});
};

Tasks.list = function (obj) {
	var search = [];

	Object.keys(obj).forEach(function (key) {
		search.push(key + ":.*" + obj[key]);
	});

	return Tasks.get_all(function (data, file) {
		var found = false;

		search.forEach(function (value) {
			if (!value) return true;
//console.log("search", value, "in", file, ":", data.match(value));
			if (data.match(value)) found = true;
		});

		return found;
	});
};

module.exports = Tasks;
