var Main = require('./task/main'),
	Factory = require('./task/factory')(Main),
	Task = require('./task/meta')(Factory)
;
module.exports = Task;
