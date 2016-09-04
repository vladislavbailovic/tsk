var Task = require('./task/core');

Task = require('./task/factory')(Task);
Task = require('./task/meta')(Task);


module.exports = Task;
