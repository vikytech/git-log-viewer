var fs = require("fs");
var file = "git_log_viewer.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

if (!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}


db.serialize(function () {
    if (!exists) {
        db.run("CREATE TABLE read_commit (sha TEXT, UNIQUE(sha) ON CONFLICT REPLACE)");
    }
});

module.exports = {
    read: function (callback) {
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
    }
}

