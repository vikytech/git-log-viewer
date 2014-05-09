var express = require('express');
var router = express.Router();
var service = require('../service.js');

router.get('/', function (req, res) {
    service.getCommitsWithStatus(function (err, commitsWithStatus) {
        res.render('home', {commitsWithStatus: commitsWithStatus});
    })
});

router.post('/addRepo', function (req, res) {
    var repoLabel = req.param("repoLabel");
    var repoPath = req.param("repoPath");
    service.registerRepo(repoLabel, repoPath);
});

router.get('/commit', function (req, res) {
    var commitID = req.param("hash");
    service.updateReadCommit(commitID)
    service.getGitDiff(commitID, function (err, diff) {
        res.render('index', {diff: diff});
    });
});

module.exports = router;
