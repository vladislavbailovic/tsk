var Filters = {

};

Filters.NOBODY = '[\'"\\s]+$';
Filters.ANYBODY = '[\'"]?[^\'"]+[\'"]?\\s*$';
Filters.EMPTY_LIST = '\\[\\]';
Filters.NON_EMPTY_LIST = '\\[[^\\]]+\\]';

module.exports = Filters;
