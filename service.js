var git = require('./git.js');
var db = require('./db.js');

module.exports = {
    getCommitsWithStatus: function (callback) {
        git.getCommits(100, function (err, commits) {
            db.readCommits(function (err, data) {
                commits.forEach(function (commit) {
                    var isCommitRead = data.indexOf(commit.sha()) != -1;
                    commit.status = isCommitRead ? true : false;
                });
                count = commits.length - data.length;
                db.readAllRepos(function(err,repos){
                    callback(err, {commits: commits, totalUnReadCommits: count, repos:repos});
                });
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
    },

    registerRepo: function (repoLabel, repoPath) {
        db.addRepo(repoLabel, repoPath)
    },
    getAllRepos: function(callback){
        db.readAllRepos(callback);
    }
}