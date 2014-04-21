var git = require('gift');
var repo = git("/Users/prasantd/Documents/Work/Abcam/Logistics/STRSplitter");

module.exports = {
    getCommits: function (callback) {
        repo.commits("master", 300, callback);
    }
}
