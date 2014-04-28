var git = require('./git.js');
var file = require('./fileOperations.js');

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(function (result, commits) {
            commitsWithStatus = file.write(commits);
            callback(commitsWithStatus);
        });
    },

    getGitDiff: function (commitID, callback) {
        git.getParentCommit(commitID, function (err, data) {
            git.getDiff(commitID, data,
                function (err, data) {
                    callback(data);
                });
        });
    }
}