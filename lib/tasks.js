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
	var search = yaml.stringify(obj).split("\n"),
		prm = [],
		results = []
	;
	return new Promise(function (resolve, reject) {
		glob(tsk.get_root() + '/**/*.yml', function (err, files) {
			if (err) reject(err);

			files.forEach(function (file) {
				prm.push(new Promise(function (rs, rj) {
					fs.readFile(file, 'utf8', function (err, data) {
						search.forEach(function (value) {
							if (!value) return true;
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
						
						var slug = val.replace(/^.*\//g, '').replace(/\.yml$/, '');
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
