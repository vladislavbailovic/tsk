var Filters = require('./filters');


var Query = {
	filter: function (obj) {
		var andvars = [],
			orvars = []
		;

		Object.keys(obj).forEach(function (key) {
			var dest = "and" === key ? andvars : orvars;
			obj[key].forEach(function (val) {
				dest.push.apply(dest, QueryFilters.to_filters(val));
				/*Object.keys(val).forEach(function (idx) {
					dest.push(Filters.keyval(idx, val[idx]));
				});*/
			});
		});

		if (!orvars.length) return QueryFilters.and(andvars);
		if (!andvars.length) return QueryFilters.or(orvars);

		return QueryFilters.andor(andvars, orvars);
	},

	and: function (query) {
		return QueryFilters.and(QueryFilters.to_filters(query));
	},

	or: function (query) {
		return QueryFilters.or(QueryFilters.to_filters(query));
	}
};

var QueryFilters = {};

QueryFilters.to_filters = function (query) {
	var filters = [];

	Object.keys(query).forEach(function (key) {
		filters.push(Filters.keyval(key, query[key]));
	});

	return filters;
};

QueryFilters.and = function (filters) {
	return function (data, file) {
		return filters.every(function (value) {
console.log("ANDing", value, "in", file)
			if (!!value && data.match(value)) {
console.log("AND matched", value, "in", file);
				return true;
			}
			return false;
		});
	};
};

QueryFilters.or = function (filters) {
	return function (data, file) {
		return filters.some(function (value) {
console.log("ORing", value, "in", file);
			if (!!value && data.match(value)) {
console.log("OR matched", value, "in", file);
				return true;
			}
			return false;
		});
	};
};

QueryFilters.andor = function (andf, orf) {
	return function (data, file) {
		return andf.every(function (value) {
				if (!!value && data.match(value)) {
					return true;
				}
				return false;
			}) ||
			orf.some(function (value) {
				if (!!value && data.match(value)) {
					return true;
				}
				return false;
			})
		;
	};
};

module.exports = Query;
