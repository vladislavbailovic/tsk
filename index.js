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


Task.load('test2').then(function (t) {
	console.log(t);
});
