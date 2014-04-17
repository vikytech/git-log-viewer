var git;

git = require('gift');

repo = git("/Users/vikytech/Copy/Git/Js/gitLogViewer");
repo.commits("master", 30, function (err, commits) {
    gitCommit = commits;
    console.log(gitCommit[0].id)
});