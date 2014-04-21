var express = require('express');
var router = express.Router();
var git = require('../git.js');
router.get('/', function (req, res) {
    git.getCommits(function (result, commits) {
        console.log(commits[0]);
        res.render('home', { commits: commits});
    });
});
router.get('/commit', function (req, res) {
    res.render('index', {hash: req.param("hash")});
});

module.exports = router;
