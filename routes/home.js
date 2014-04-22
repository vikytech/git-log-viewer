var express = require('express');
var router = express.Router();
var git = require('../git.js');
var _ = require('underscore')._;

commitWithStatus = [];
router.get('/', function (req, res) {
    git.getCommits(function (result, commits) {
        console.log(commits[0]);

        _.each(commits, function (commit) {
            commitWithStatus.push({commit: commit, status: "unread"});
        });
        res.render('home', { commits: commitWithStatus});
    });
});
router.get('/commit', function (req, res) {
    res.render('index', {hash: req.param("hash")});
});

module.exports = router;
