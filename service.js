var git = require('./git.js');
var file = require('./file.js');
var _ = require('underscore')._;

var commitsWithStatus = {};

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(100, function (err, commits) {
            file.read(function (err, delimitedData) {
                data = delimitedData.split(",");
                var count = 0;
                _.each(commits, function (commit) {
                    commit.status = _.contains(data, commit.sha());
                    if (!commit.status) {
                        count++;
                    }
                });
                commitsWithStatus = {commits: commits, unreadCount: count};
                callback(err, commitsWithStatus);
            });
        });
    },

    getGitDiff: function (commitID, callback) {
        git.getDiff(commitID, function (err, data) {
            callback(err, data);
        });
    },

    updateReadCommit: function (commitId) {
        file.update(commitId);
    }
}