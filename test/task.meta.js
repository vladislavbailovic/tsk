var tap = require('tap');

tap.test('task/core.js', function (t) {

	var MockCore = function () {},
		Task = require('../lib/task/meta')(MockCore),
		tsk = require('../lib/util')
	;

	t.test('task.get_valid_meta', function (t) {
		var task = new Task(),
			tstamp = tsk.date.fmt(),
			tmp
		;

		t.equal(task.get_valid_meta('created', tstamp), tstamp, "Valid created date with valid existing value");
		t.match(task.get_valid_meta('created', 'aaa'), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Invalid created date converts to match date regex');
		t.match(task.get_valid_meta('created', false), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Empty created date converts to match date regex');

		t.equal(task.get_valid_meta('modified', tstamp), tstamp, "Valid modified date with valid existing value");
		t.match(task.get_valid_meta('modified', 'aaa'), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Invalid modified date converts to match date regex');
		t.match(task.get_valid_meta('modified', false), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Empty modified date converts to match date regex');

		tmp = task.get_valid_meta('followers', false);
		t.ok(tmp instanceof Array, "Empty followers becomes an array");
		t.ok(0 === tmp.length, "Empty followers becomes an *empty* array");

		tmp = task.get_valid_meta('followers', "aaa");
		t.ok(tmp instanceof Array, "Invalid followers become an array");
		t.ok(0 === tmp.length, "Invalid followers become an *empty* array");

		tmp = task.get_valid_meta('followers', "aaa,bbb,ccc");
		t.ok(tmp instanceof Array, "Invalid CSV followers become an array");
		t.ok(0 === tmp.length, "Invalid CSV followers become an *empty* array");

		t.end();
	});

	t.end();

});
