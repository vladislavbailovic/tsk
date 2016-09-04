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

		tmp = task.get_valid_meta('unknown whatever', "aaa,bbb,ccc");
		t.notOk(tmp, "Unknown key returns false-ish");

		t.end();
	});

	t.test('task.get_meta_object', function (t) {
		var task = new Task();

		t.ok(tsk.data.is_valid_date(task.get_meta('created')), "Valid created date value");
		t.ok(tsk.data.is_valid_array(task.get_meta('followers')), "Valid followers value");

		t.end();
	});

	t.test('task.get_meta', function (t) {
		var task = new Task(),
			obj = {
				created: tsk.date.fmt(),
				followers: "some stuff here",
				test_property: "Has some value"
			},
			result = task.get_meta_object(obj)
		;

		t.ok("created" in result, "Result retains created date");
		t.equal(result.created, obj.created, "Created date value preserved");

		t.ok("followers" in result, "Result retains followers");
		t.notEqual(result.followers.length, obj.followers.length, "Followers value validated");

		t.notOk("test_property" in result, "Result does not retain unknown property");

		t.end();
	});

	t.end();

});
