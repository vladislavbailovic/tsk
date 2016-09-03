var tap = require('tap');

tap.test('Util', function (t) {

	var tsk = require('../lib/util');

	t.test('get_root', function (t) {
		var root = tsk.get_root();
		t.ok(root, "Root has value");
		t.type(root, "string", "Root is string");
		t.equal('.tsk', root, "Root is hardcoded");
		t.end();
	});

	t.end();

});
