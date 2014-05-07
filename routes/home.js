var express = require('express');
var router = express.Router();
var service = require('../service.js');

router.get('/', function (req, res) {
    service.getCommitsWithStatus(function (err, commitsWithStatus) {
        res.render('home', {commitsWithStatus: commitsWithStatus});
    })
});

router.get('/commit', function (req, res) {
    var commitID = req.param("hash");
    service.updateReadCommit(commitID)
    service.getGitDiff(commitID, function (err, diff) {
        res.render('index', {diff: diff});
    });
});

module.exports = router;
