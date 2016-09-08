/*
var Task = require('./lib/task');

var data = {
	meta: {
		created: '2016-09-02T07:20',
	},
	task: `
Task title
==========
Task content goes here
	`
};

Task.create('test2', data)
	.then(function (task) {
		console.log("~~~ all done ~~~");
	})
	.catch(function (err) {
		console.log(arguments);
	})
;

*/

var Task = require('./lib/task');
/*
Task.load('test2').then(function (t) {
	console.log(t.get_meta('modified'));
});
Task.load('test3').then(function (t) {
	console.log(t.get_html());
});
*/


var Tasks = require('./lib/tasks');
var NOBODY = '[\'"\\s]+$',
	ANYBODY = '[\'"]?[^\'"]+[\'"]?\\s*$',
	EMPTY_LIST = '\\[\\]',
	NON_EMPTY_LIST = '\\[[^\\]]+\\]'
;

Tasks.filter({
	/*and: [
		{assigned: NOBODY}
	],*/
	/*
	or: [
		{assigned: ANYBODY},
		{followers: NON_EMPTY_LIST}
	]
	*/
	and: [
		{assigned: NOBODY},
		{followers: NON_EMPTY_LIST}
	]
}).then(function (tasks) {
	console.log("received", tasks.length);
	if (tasks.length) console.log(tasks.map(function (t) { return t.slug; }).join(","));
}).catch(function () {
	console.log("error", arguments)
});

/*
Tasks.list({
	assigned: NOBODY,
	//followers: EMPTY_LIST
}).then(function (tasks) {
	console.log("received", tasks.length)
}).catch(function () {
	console.log("error", arguments)
});
*/
