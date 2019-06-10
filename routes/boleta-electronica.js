var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

const { exec } = require('child_process');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

require('dotenv').config();



var mysql = require('mysql');
var env = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  port: 3306
}
var appRoot = '/home/marcos/Documentos/trabajo/terminal-apvyu';

var con = mysql.createConnection(env);

//Variables de la consulta sql para traer las boletas
// #region
var sql1 = "SELECT  id, campo1 AS adjudicatario, periodo, campo9 AS vencimiento,  STR_TO_DATE(campo9, '%d/%m/%Y') AS fecha_vto,  DATE(NOW()) AS fecha_hoy,  estado,  IF(estado = 'ABONADA' OR STR_TO_DATE(campo9, '%d/%m/%Y') > DATE(NOW()) , 'block', 'none') AS abonado,   IF(estado = 'ABONADA' OR STR_TO_DATE(campo9, '%d/%m/%Y') > DATE(NOW()), 'none', 'block') AS actualizar,   round(substr(campo25, 2, length(campo25)-1) +   substr(campo26, 2, length(campo26)-1) +   substr(campo27, 2, length(campo27)-1) +   substr(campo28, 2, length(campo28)-1) -   substr(campo31, 2, length(campo31)-1) +  substr(campo32, 2, length(campo32)-1) -   substr(campo33, 2, length(campo33)-1) +   substr(campo34, 2, length(campo34)-1) +   substr(campo35, 2, length(campo35)-1) +   substr(campo36, 2, length(campo36)-1) +   substr(campo101, 2, length(campo101)-1) +   substr(campo30, 2, length(campo30)-1), 2) AS importe FROM   boletas WHERE   substr(adj,1,5)= ";
var sql2 = " ORDER BY periodo DESC limit 5";
// #endregion


/* GET search de boleta page. */
router.get('/', function(req, res, next) {
  res.render('boleta-electronica/search');
});

router.post('/', urlencodedParser, function(req, res, next){
  var id = req.body.cod_adj;
  console.log(id);
  con.connect(function(err) {
    if (err) throw err;

    con.query((sql1 + id + sql2), 
      function (err, result, fields) {
        if (err) throw err;
        console.log(result.length);

        //Cierre de conexion
        con.end(function(err){
          if(err) throw err;
          console.log('Conexion cerrada');
          con = mysql.createConnection(env, function(err){
            if (err){
              console.log(err)
            } else {
              console.log('Conexion reestablecida');
            }
          });
        });
        //Si el resultado es vacio, ir a raiz
        if (result.length > 0){
          res.redirect('/boleta-electronica/' + id);
        } else {
          res.redirect('/boleta-electronica');
        }
      });
  });
});

router.get('/:id', function(req, res, next){
  var id = req.params.id;
  con.connect(function(err) {
    if (err) throw err;

    con.query((sql1 + id + sql2), 
      function (err, result, fields) {
        var boletas = result;
        if (err) throw err;
        console.log(result);

        boletas.forEach(boleta => {
          if (boleta.abonado === 'block'){
            boleta.imprimir = true;
          } else {
            boleta.imprimir = false;
          }
        
        });
        res.render('boleta-electronica/index', {boletas : boletas});
        con.end(function(err){
          if(err) throw err;
          console.log('Conexion cerrada');
          con = mysql.createConnection(env, function(err){
            if (err){
              console.log(err)
            } else {
              console.log('Conexion reestablecida');
            }
          });
      });

      
    });
    
  });
  
});

router.get('/:id/print', function(req,res,next){
  var id = parseInt(req.params.id);
  console.log(typeof id);
  var path = 'docs/boletas/'+id+'.pdf'
  var boleta = {};
  var postData = '"boleta_id='+ id +' \& peticion=imprimir"';

  const output = appRoot + '/public/' + path;
  //var cmd = 'wget --post-data '+ postData+' http://localhost/boleta/makepdf.php -O '+ output;
  var cmd = 'wget --post-data '+ postData+' https://vivienda.larioja.gov.ar/boleta/makepdf.php -O '+ output;

// Function to download file using wget
    exec(cmd, function(err, stdout, stderr) {
        if (err) throw err;

        else console.log(id + ' downloaded to ' + output);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (err !== null) {
          console.log('exec error: ' + error);
        }
        
        boleta.path = path;
  
        res.render('boleta-electronica/print', {boleta : boleta});
    });
  
  

});


module.exports = router;
