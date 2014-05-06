var fs = require('fs');
var _ = require('underscore')._;
var FILE_NAME = "status.txt";

commitWithStatus = [];

module.exports = {

    read: function (callback) {
        fs.readFile(FILE_NAME, 'utf8', function (err, data) {
            callback(err, data);
        });
    },

    update: function (commitId) {
        this.read(function (err, delimitedData) {
            var data = delimitedData.split(",");
            if (!_.contains(data, commitId)) {
                fs.appendFile(FILE_NAME, "," + commitId);
            }
        });
    }
}
