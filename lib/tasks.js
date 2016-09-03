var yaml = require('yamljs'),
	glob = require('glob'),
	fs = require('fs')
;

var tsk = require('./util'),
	Task = require('./task')
;

var Tasks = function () {

};

Tasks.list = function (obj) {
	var search = [],
		prm = [],
		results = []
	;

	Object.keys(obj).forEach(function (key) {
		search.push(key + ":.*" + obj[key]);
	});

	return new Promise(function (resolve, reject) {
		if (!search.length) resolve([]);

		glob(tsk.get_root() + '/**/*.yml', function (err, files) {
			if (err) reject(err);

			files.forEach(function (file) {
				prm.push(new Promise(function (rs, rj) {
					fs.readFile(file, 'utf8', function (err, data) {
						search.forEach(function (value) {
							if (!value) return true;
//console.log("search", value, "in", file, ":", data.match(value));
							if (data.match(value)) {
								return rs(file);
							}
							rs();
						});
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

module.exports = Tasks;
