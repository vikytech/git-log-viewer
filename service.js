var git = require('./git.js');
var file = require('./fileOperations.js');

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(161, function (err, commits) {
            commitsWithStatus = file.write(commits);
            callback(commitsWithStatus);
        });
    },

    getGitDiff: function (commitID, callback) {
        git.getDiff(commitID, function (err, data) {
            callback(err, data);
        });
    }
}