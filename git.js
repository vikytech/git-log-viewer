var repo = require('nodegit').Repo;
var open = repo.open;
var REPO_PATH = "/Users/prasantd/Documents/Work/Others/uno";

module.exports = {
    getCommits: function (numOfCommits, callback) {
        var commits = [];
        open(REPO_PATH, function (err, repo) {
            repo.getMaster(function (err, branch) {
                var history = branch.history();
                var count = 0;
                history.on("commit", function (commit) {
                    if (count++ >= numOfCommits) {
                        callback(err, commits);
                        return;
                    }
                    commits.push(commit);
                });
                history.start();
            });
        });
    },
    getDiff: function (commitId, callback) {
        var data = "";
        open(REPO_PATH, function (err, repo) {
            repo.getCommit(commitId, function (err, commit) {
                commit.getDiff(function (err, diffList) {
                    diffList.forEach(function (diff) {
                        diff.patches().forEach(function (patch) {
                            data += "\n diff", patch.oldFile().path(), patch.newFile().path();
                            patch.hunks().forEach(function (hunk) {
                                data += "\n" + (hunk.header().trim());
                                hunk.lines().forEach(function (line) {
                                    data += "\n" + String.fromCharCode(line.lineOrigin) + line.content.trim();
                                });
                            });
                        });
                    });
                    callback(err, data);
                    return;
                });
            });
        });
    }
}