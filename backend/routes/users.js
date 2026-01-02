var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('good Api is hit');
});

module.exports = router;
