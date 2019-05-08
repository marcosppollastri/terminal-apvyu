var express = require('express');
var router = express.Router();
var fecha = Date.now().toPrecision();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/requisitos', function(req, res, next){
  res.render('requisitos/menu-requisitos', fecha);
});

router.get('/requisitos/con-terreno', function(req, res, next){
  res.render('requisitos/con-terreno/index-con-terreno');
})

router.get('/requisitos/con-terreno/llave-en-mano', function(req,res,next){
  res.render('requisitos/con-terreno/llave-en-mano');
});
module.exports = router;
