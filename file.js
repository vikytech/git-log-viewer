var fs = require('fs');
var _ = require('underscore')._;
var READ_COMMITS = "readCommits.txt";

commitWithStatus = [];

module.exports = {

    read: function (callback) {
        fs.readFile(READ_COMMITS, 'utf8', function (err, data) {
            callback(err, data);
        });
    },

    update: function (commitId) {
        this.read(function (err, delimitedData) {
            var data = delimitedData.split(",");
            if (!_.contains(data, commitId)) {
                fs.appendFile(READ_COMMITS, "," + commitId);
            }
        });
    }
}
