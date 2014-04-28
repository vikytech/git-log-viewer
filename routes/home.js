var express = require('express');
var router = express.Router();
var service = require('../service.js');

router.get('/', function (req, res) {
    service.getCommitsWithStatus(function (commitsWithStatus) {
        res.render('home', {commits: commitsWithStatus});
    })
});

router.get('/commit', function (req, res) {
    var commitID = req.param("hash");

    service.getGitDiff(commitID, function (diff) {
        res.render('index', {hash: diff});
    });
});

module.exports = router;
