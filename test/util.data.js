var tap = require('tap');

tap.test('util/date.js', function (t) {

	var tsk = require('../lib/util');

	t.test('data.is_valid_array', function (t) {
		t.notOk(tsk.data.is_valid_array("aaa,bbb,ccc"), "String is not array");
		t.ok(tsk.data.is_valid_array(["aaa","bbb","ccc"]), "String array is array");
		t.notOk(tsk.data.is_valid_array(["aaa","bbb","ccc"], tsk.data.is_number), "String array is not a numeric array");
		t.notOk(tsk.data.is_valid_array(["aaa","bbb","ccc", 1,2,3], tsk.data.is_number), "Mixed array is not a numeric array");

		t.end();
	});

	t.end();

});
