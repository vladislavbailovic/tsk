var glob = require('glob'),
	fs = require('fs')
;

var tsk = require('./util'),
	Task = require('./task'),
	Filters = require('./filters'),
	Query = require('./query')
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


Tasks.filter = function (obj) {
	return Tasks.get_all(Query.filter(obj));
};

Tasks.list = function (obj) {
	return Tasks.get_all(Query.or(obj));
};

module.exports = Tasks;
