var git = require('./git.js');
var file = require('./file.js');

var commitsWithStatus = {};

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(100, function (err, commits) {
            file.read(function (err, delimitedData) {
                data = delimitedData.split(",");
                commitsWithStatus = {commit: commits, readCommits: data };
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