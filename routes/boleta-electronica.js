var express = require('express');
var router = express.Router();


/* GET search de boleta page. */
router.get('/', function(req, res, next) {
  res.render('boleta-electronica/search');
});

router.post('', function(req, res, next){
  
})


module.exports = router;
