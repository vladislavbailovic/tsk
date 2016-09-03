var tap = require('tap');

tap.test('util.js', function (t) {

	var tsk = require('../lib/util');

	t.test('get_root', function (t) {
		var root = tsk.get_root();

		t.ok(root, "Root has value");
		t.type(root, "string", "Root is string");
		t.equal('.tsk', root, "Root is hardcoded");

		t.end();
	});

	t.test('slug_to_pathspec', function (t) {
		var pth = tsk.slug_to_pathspec('path/to/file');

		t.match(pth, /\.yml$/, "Ends with .yml extension");
		t.equal('path-to-file.yml', pth, "Properly formats paths");

		t.end();
	});

	t.test('path_to_slug', function (t) {
		var pth = tsk.path_to_slug('path/to/file.yml');

		t.equal('file', pth, "Properly unformats paths");

		t.end();
	});

	t.test('get_path', function (t) {
		var root = tsk.get_root();
		var pth = tsk.get_path('file');

		t.match(pth, /\.yml$/, "Ends with .yml extension");
		t.match(pth, new RegExp('^' + root + '/'), "Starts with root path");
		t.equal(root + '/file.yml', pth, "Has full relative path");

		t.end();
	});

	t.end();

});
