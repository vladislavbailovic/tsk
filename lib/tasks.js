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

var _and = function (filters) {
	return function (data, file) {
		return filters.every(function (value) {
			var matcher = new RegExp(value, 'm');
console.log("ANDing", matcher, "in", file)
			if (!!value && data.match(matcher)) {
console.log("AND matched", value, "in", file);
				return true;
			}
			return false;
		});
	};
};

var _or = function (filters) {
	return function (data, file) {
		return filters.some(function (value) {
			var matcher = new RegExp(value, 'm');
console.log("ORing", matcher, "in", file);
			if (!!value && data.match(matcher)) {
console.log("OR matched", value, "in", file);
				return true;
			}
			return false;
		});
	};
};

var _andor = function (andf, orf) {
	return function (data, file) {
		return andf.every(function (value) {
				if (!!value && data.match(new RegExp(value, 'm'))) {
					return true;
				}
				return false;
			}) ||
			orf.some(function (value) {
				if (!!value && data.match(new RegExp(value, 'm'))) {
					return true;
				}
				return false;
			})
		;
	};
};

var _filter = function (obj) {
	var andvars = [],
		orvars = []
	;

	Object.keys(obj).forEach(function (key) {
		var dest = "and" === key ? andvars : orvars;
		obj[key].forEach(function (val) {
			Object.keys(val).forEach(function (idx) {
				dest.push('^\\s*' + idx + ":\\s*" + val[idx]);
			});
		});
	});

	if (!orvars.length) return _and(andvars);
	if (!andvars.length) return _or(orvars);

	return _andor(andvars, orvars);
};

Tasks.filter = function (obj) {
	return Tasks.get_all(_filter(obj));
};

Tasks.list = function (obj) {
	var search = [];

	Object.keys(obj).forEach(function (key) {
		search.push('^\\s*' + key + ":\\s*" + obj[key]);
	});

	return Tasks.get_all(_or(search));
};

module.exports = Tasks;
