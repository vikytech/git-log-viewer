var git = require('gift');
var repo = git("/Users/prasantd/Documents/Work/Others/uno");
var _ = require('underscore')._;

module.exports = {
    getCommits: function (callback) {
        repo.commits("master", 300, callback);
    },
    getDiff: function (commitA, commitB, callback) {
        repo.diff(commitA, commitB, function (err, data) {
            callback(err, data[0].diff);
        });
    },
    getParentCommit: function (commitId, callback) {
        this.getCommits(function (err, commits) {
            callback(err, _.filter(commits, function (data) {
                return data.id == commitId
            })[0].parents()[0].id);
        });
    }
}
