var fs = require('fs');
var _ = require('underscore')._;
var FILE_NAME = "status.json";

commitWithStatus = [];

module.exports = {
    write: function (commits) {
        fs.writeFile(FILE_NAME, "[");

        _.each(commits, function (commit) {
            fs.appendFile(FILE_NAME, "{\"" + commit.id + "\" : " + "\"Unread\"" + "},");
            commitWithStatus.push({commit: commit, status: "Unread"});
        });

        fs.appendFile(FILE_NAME, "{}]");

        return commitWithStatus;
    },

    update: function (commitId) {
        fs.readFile(FILE_NAME, 'utf8', function (err, data) {
            var commits = JSON.parse(data);

            _.each(commits, function (commit) {
                if (commit[commitId]) commit[commitId] = "Read"
            });

            fs.writeFile(FILE_NAME, JSON.stringify(commits));
        });
    }
};