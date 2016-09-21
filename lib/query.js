var Filters = require('./filters'),
	Debug = require('./debug')
;


var Query = {

	/**
	 * Creates a filtering callback from a query-formatted object
	 * Query-formatted object has "and" and/or "or" keys,
	 * each of which being an array of condition objects.
	 *
	 * Condition objecs are sent to {QueryFilters.to_filters()} to
	 * convert them to array of filter matchers
	 *
	 * @param {Object} obj Query object
	 *
	 * @return {Function} Filtering callback
	 */
	filter: function (obj) {
		var andvars = [],
			orvars = []
		;

		Object.keys(obj).forEach(function (key) {
			var dest = "and" === key ? andvars : orvars;
			obj[key].forEach(function (val) {
				dest.push.apply(dest, QueryFilters.to_filters(val));
			});
		});

		if (!orvars.length) return QueryFilters.and(andvars);
		if (!andvars.length) return QueryFilters.or(orvars);

		return QueryFilters.andor(andvars, orvars);
	},

	/**
	 * Converts a condition object to a boolean AND type filter cascade
	 *
	 * Content will have to match *all* the filters created from condition object key/value pairs
	 *
	 * @param {Object} query Condition object
	 *
	 * @return {Function} Filtering callback
	 */
	and: function (query) {
		return QueryFilters.and(QueryFilters.to_filters(query));
	},

	/**
	 * Converts a condition object to a boolean OR type filter cascade
	 *
	 * Content will have to match *any* the filters created from condition object key/value pairs
	 *
	 * @param {Object} query Condition object
	 *
	 * @return {Function} Filtering callback
	 */
	or: function (query) {
		return QueryFilters.or(QueryFilters.to_filters(query));
	}
};


var QueryFilters = {

	/**
	 * Converts a condition object to a set of filters
	 *
	 * @param {Object} query Condition object
	 *
	 * @return {Array} A set of filters
	 */
	to_filters: function (query) {
		var filters = [];

		Object.keys(query).forEach(function (key) {
			filters.push(Filters.keyval(key, query[key]));
		});

		return filters;
	},

	/**
	 * Converts a set of filters into an AND-joined filtering callback
	 *
	 * @param {Array} filters Filters cascade (e.g. as returned by {QueryFilters.to_filters()})
	 *
	 * @return {Function} Filtering callback
	 */
	and: function (filters) {
		return function (data, context) {
			return filters.every(QueryFilters.match(data, context));
		};
	},

	/**
	 * Converts a set of filters into an OR-joined filtering callback
	 *
	 * @param {Array} filters Filters cascade (e.g. as returned by {QueryFilters.to_filters()})
	 *
	 * @return {Function} Filtering callback
	 */
	or: function (filters) {
		return function (data, context) {
			return filters.some(QueryFilters.match(data, context));
		};
	},

	/**
	 * Converts two sets of filters into an OR-joined complex query
	 *
	 * @param {Array} andf ANDing filters
	 * @param {Array} orf ORing filters
	 *
	 * @return {Function} Joined filtering callback
	 */
	andor: function (andf, orf) {
		return function (data, context) {
			return andf.every(QueryFilters.match(data, context)) || orf.some(QueryFilters.match(data, context));
		};
	},

	/**
	 * Returns a contextual matcher for a filter
	 *
	 * @param {String} data Data to check against
	 * @param {String} context Optional context in which data appears
	 *
	 * @return {Function} Function accepting a single regex/string parameter to match in data
	 */
	match: function (data, context) {
		return function (query_rx) {
			var match = !!(!!query_rx && data.match(query_rx));

			Debug.dbg("Matching", query_rx, "in", context, ":", match);

			return match;
		};
	}
};

module.exports = Query;
