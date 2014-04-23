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
    var commitId = req.param("hash");
    file.update(commitId);
    res.render('index', {hash: commitId});
});

module.exports = router;
