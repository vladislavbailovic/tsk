var tap = require('tap');

tap.test('task/core.js', function (t) {

	var MockCore = function () {};

	t.test('Task.load', function (t) {
		MockCore.prototype.load = function () {
			return true;
		};
		var Task = require('../lib/task/factory')(MockCore);

		t.ok(Task.load('something'), "Static loading returns true-ish from mock");
		t.end();
	});

	t.test('Task.create', function (t) {
		MockCore.prototype.save = function () {
			return true;
		};
		MockCore.prototype.populate = function () {};
		var Task = require('../lib/task/factory')(MockCore);

		t.ok(Task.create('something'), "Static creation returns true-ish from mock");
		t.end();
	});

	t.end();

});
