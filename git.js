var _ = require('underscore')._;
var repo = require('nodegit').Repo;
var open = repo.open;

module.exports = {
    getCommits: function (repoPath,branch,numOfCommits, callback) {
        var commits = [];
        open(repoPath, function (err, repo) {
            repo.getBranch(branch, function (err, branch) {
                var history = branch.history();
                var count = 0;
                history.on("commit", function getCommit(commit) {
                    if (count++ >= numOfCommits) {
                        history.removeListener("commit", getCommit);
                        callback(err, commits);
                        return;
                    }
                    commits.push(commit);
                });
                history.start();
            });
        });
    },
    getDiff: function (commitId,repoPath, callback) {
        var data = "";
        open(repoPath, function (err, repo) {
            repo.getCommit(commitId, function (err, commit) {
                commit.getDiff(function (err, diffList) {
                    _.each(diffList, function (diff) {
                        _.each(diff.patches(), function (patch) {
                            data += "\n diff", patch.oldFile().path(), patch.newFile().path();
                            _.each(patch.hunks(), function (hunk) {
                                data += "\n" + (hunk.header().trim());
                                hunk.lines().forEach(function (line) {
                                    data += "\n" + String.fromCharCode(line.lineOrigin) + line.content.trim();
                                });
                            });
                        });
                    });
                    callback(err, data);
                });
            });
        });
    }
}