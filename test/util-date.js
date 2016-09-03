var tap = require('tap');

tap.test('util/date.js', function (t) {

	var tsk = require('../lib/util');

	t.test('date.fmt', function (t) {
		var tstamp = tsk.date.fmt();

		t.ok(tstamp, "Timestamp is generated");
		t.type(tstamp, "string", "Timestamp is string");
		t.match(tstamp, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/, "Timestamp is in proper format");

		t.end();
	});

	t.test('date.fmt', function (t) {
		var now = Date.now(),
			tstamp = tsk.date.fmt(now),
			result = tsk.date.parse(tstamp)
		;

		t.ok(result, "Timestamp is parsed");
		t.type(tstamp, "number", "Timestamp is a number");
		t.equal(now, result, "Parsed timestamp matches original");

		t.end();
	});

	t.end();

});
