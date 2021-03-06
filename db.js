var fs = require("fs");
var file = "git_log_viewer.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

if (!exists) {
    console.log("Creating DB .......");
    fs.openSync(file, "w");
}


db.serialize(function () {
    if (!exists) {
        db.run("CREATE TABLE read_commit (sha TEXT, UNIQUE(sha) ON CONFLICT REPLACE)");
        db.run("CREATE TABLE repos (repoLabel TEXT,repoPath TEXT,branchName TEXT) ");
    }
});

module.exports = {
    readCommits: function (callback) {
        db.all("SELECT sha FROM read_commit", function (err, all) {
            var commitsIds = all.map(function (commit) {
                return commit.sha;
            });

            callback(err, commitsIds);
        });
    },

    update: function (commitId) {
        var stmt = db.prepare("INSERT INTO read_commit VALUES (?)");
        db.serialize(function () {
            stmt.run(commitId);
            stmt.finalize();
        });
    },

    addRepo: function (repoLabel, repoPath, branchName) {
        var stmt = db.prepare("INSERT INTO repos VALUES (?,?,?)");
        db.serialize(function () {
            stmt.run(repoLabel, repoPath, branchName);
            stmt.finalize();
        });
    },
    readAllRepos:function(callback){
      db.all("SELECT * FROM repos",function(err,repos){
            callback(err,repos);
      })
    }
}

