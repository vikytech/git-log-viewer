var git = require('./git.js');
var db = require('./db.js');

module.exports = {
    getCommitsWithStatus: function (repoPath, branch, callback) {
        git.getCommits(repoPath, branch, 100, function (err, commits) {
            db.readCommits(function (err, data) {
                commits.forEach(function (commit) {
                    var isCommitRead = data.indexOf(commit.sha()) != -1;
                    commit.status = isCommitRead ? true : false;
                });
                count = commits.length - data.length;
                db.readAllRepos(function (err, repos) {
                    git.getReposUnreadCommitCount(repos, data, function (err, repoWithUnreadCount) {
                        callback(err, {commits: commits, totalUnReadCommits: count, repos: repoWithUnreadCount, currentRepoPath: repoPath});
                    })
                });
            });
        });
    },

    getGitDiff: function (commitID, repoPath, callback) {
        git.getDiff(commitID, repoPath, function (err, data) {
            callback(err, data);
        });
    },

    updateReadCommit: function (commitId) {
        db.update(commitId);
    },

    registerRepo: function (repoLabel, repoPath, branchName) {
        db.addRepo(repoLabel, repoPath, branchName)
    },

    getAllRepos: function (callback) {
        db.readAllRepos(callback);
    }
}