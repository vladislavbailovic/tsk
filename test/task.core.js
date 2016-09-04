var tap = require('tap');

tap.test('task/core.js', function (t) {

	var Task = require('../lib/task/core');

	t.test('task.load', function (t) {
		var tsk = require('../lib/util');

		// Shim the path getter
		tsk.get_path = function () { return 'nothing'; };
		Task.prototype.get_meta_object = function () { return {}; };

		var task = new Task();
		var prm = task.load('something').then(function (smt) {
			return t.test('task.load.promise', function (t) {
				t.notOk(smt.task, "Shimmed path returns empty task");
				t.end();
			});
		});
		t.ok(prm instanceof Promise, "Load returns a promise");

		return prm;
	});

	t.test('task.save reject', function (t) {
		var fs = require('fs');

		// Shim file writing to throw error
		fs.writeFile = function (file, data, callback) {
			callback.apply(fs, [true]);
		};

		var task = new Task();
		var prm = task.save('something')
			.then(
				function () {
					t.fail("Should have been rejected");
					t.end();
				},
				function (smt) {
					t.pass("Rejected");
					t.end();
				}
			)
		;
		t.ok(prm instanceof Promise, "Save returns a promise");

		return prm;
	});

	t.test('task.save accept', function (t) {
		var fs = require('fs');

		// Shim file writing to throw error
		fs.writeFile = function (file, data, callback) {
			callback.apply(fs, [false]);
		};

		var task = new Task();
		var prm = task.save('something')
			.then(
				function () {
					t.pass("Accepted");
					t.end();
				},
				function (smt) {
					t.fail("Should have been accepted");
					t.end();
				}
			)
		;
		t.ok(prm instanceof Promise, "Save returns a promise");

		return prm;
	});

	t.test('task.get_html', function (t) {
		var task = new Task();
		task.task = 'Test *data* here';

		t.ok(task.get_html().length, "Rendering task returns non-empty string");
		t.end();
	});

	t.end();

});
