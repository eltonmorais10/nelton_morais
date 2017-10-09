var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET backoffice */
router.get('/backoffice', function(req, res, next) {
  res.render('backoffice', { title: 'Backoffice' });
});

module.exports = router;
