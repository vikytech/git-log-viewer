var express = require('express');
var router = express.Router();
var service = require('../service.js');

router.get('/', function (req, res) {
    var REPO_PATH = "";
    service.getCommitsWithStatus(REPO_PATH,"master",function (err, commitsWithStatus) {
        res.render('home', {commitsWithStatus: commitsWithStatus});
    })
});

router.post('/addRepo', function (req, res) {
    var repoLabel = req.param("repoLabel");
    var repoPath = req.param("repoPath");
    var branchName = req.param("branchName");
    service.registerRepo(repoLabel, repoPath, branchName);
});

router.get('/commit', function (req, res) {
    var commitID = req.param("hash");
    var repoPath = req.param("path");
    service.updateReadCommit(commitID)
    service.getGitDiff(commitID, repoPath, function (err, diff) {
        res.render('index', {diff: diff});
    });
});

router.get('/repo',function(req,res){
    var repoPath=req.param("path");
    var branch=req.param("branch");
    service.getCommitsWithStatus(repoPath,branch,function (err, commitsWithStatus) {
        res.render('home', {commitsWithStatus: commitsWithStatus});
    })

});

module.exports = router;
