var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home', { message: 'Welcome to home' });
});

module.exports = router;
