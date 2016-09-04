var tap = require('tap');

tap.test('task/core.js', function (t) {

	var MockCore = function () {},
		Task = require('../lib/task/meta')(MockCore),
		tsk = require('../lib/util')
	;

	t.test('task.get_valid_meta', function (t) {
		var task = new Task(),
			tstamp = tsk.date.fmt()
		;

		t.equal(task.get_valid_meta('created', tstamp), tstamp, "Valid created date with existing value");
		t.match(task.get_valid_meta('created', 'aaa'), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Invalid created date converts to match date regex');

		t.end();
	});

	t.end();

});
