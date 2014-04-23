var fs = require('fs');
var _ = require('underscore')._;
var FILE_NAME = "status.json";

commitWithStatus = [];

module.exports = {
    write: function (commits) {
        fs.writeFile(FILE_NAME, "{\"commits\": [");

        _.each(commits, function (commit) {
            fs.appendFile(FILE_NAME, "{\"ID\": \"" + commit.id + "\" ,\"status\":" + "\"unread\"" + "},");
            commitWithStatus.push({commit: commit, status: "unread"});
        });

        fs.appendFile(FILE_NAME, "{}]}");

        return commitWithStatus;
    }
};



