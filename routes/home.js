var express = require('express');
var router = express.Router();
var git = require('../git.js');
var file = require('../fileOperations.js');

router.get('/', function (req, res) {
    git.getCommits(function (result, commits) {
        commitsWithStatus = file.write(commits);
        res.render('home', {commits: commitsWithStatus});
    });
});

router.get('/commit', function (req, res) {
    var commitA = req.param("hash");
    git.getParentCommit(commitA,
        function (err, data) {
            git.getDiff(commitA, data,
                function (err, data) {
                    res.render('index', {hash: data});
                })
        })
});

module.exports = router;
