var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/hello', function(req, res, next) {

    res.send(JSON.stringify({ a: 1 }));
});



router.post('/register', function(req, res, next) {


    res.send(JSON.stringify({ a: 1 }));
});

module.exports = router;
