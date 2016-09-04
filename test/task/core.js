var tap = require('tap');

tap.test('task/core.js', function (t) {

	var Task = require('../../lib/task/core'),
		tsk = require('../../lib/util')
	;

	t.test('task.load', function (t) {
		// Shim the path getter
		tsk.get_path = function () { return false; };

		var task = new Task();
		var prm = task.load('something').then(function (smt) {
			t.notOk(smt, "Shimmed path returns false-ish");
		});
		t.ok(prm instanceof Promise, "Load returns a promise");

		t.end();
	});

	t.end();

});
