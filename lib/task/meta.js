module.exports = function (Task) {

	Task.prototype.get_meta = function (key) {
		return (this.meta || {})[key];
	};

	return Task;
};
