var git = require('./git.js');
var db = require('./db.js');
var _ = require('underscore')._;

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(100, function (err, commits) {
            db.read(function (err, data) {
                commits.forEach(function (commit) {
                    var isCommitRead = data.indexOf(commit.sha()) != -1;
                    commit.status = isCommitRead ? true : false;
                });
                count = commits.length - data.length;
                callback(err, {commits: commits, totalUnReadCommits: count});
            });
        });
    },

    getGitDiff: function (commitID, callback) {
        git.getDiff(commitID, function (err, data) {
            callback(err, data);
        });
    },

    updateReadCommit: function (commitId) {
        db.update(commitId);
    }
}