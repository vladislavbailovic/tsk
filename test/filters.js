var tap = require('tap');

tap.test('filters.js', function (t) {

	var Filters = require('../lib/filters');

	t.test('keyval', function (t) {
		var key = 'test',
			val = 'value test',
			rx = /^\s*test:\s*value test/m,
			result = Filters.keyval(key, val)
		;


		t.ok(result, "Result has value");
		t.type(result, RegExp, "Result is regex");
		t.same(rx, result, "Result is properly formatted");

		t.end();
	});

	t.end();
});
