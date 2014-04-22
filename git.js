var git = require('gift');
var repo = git("/Users/vikytech/Copy/Git/Java/forum");

module.exports = {
    getCommits: function (callback) {
        repo.commits("master", 300, callback);
    }
}
