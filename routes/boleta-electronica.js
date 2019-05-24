var express = require('express');
var router = express.Router();
var fs = require("fs");
var stream;
//var wget = require('node-wget');


const wget = require('wget-improved');


var mysql = require('mysql');
var env = {
  host: "localhost",
  user: "joomla_vivienda",
  password: "vivi2015_lar",
  database: "joomla_tmpvivienda"
}
var appRoot = '/home/marcos/Documentos/trabajo/terminal-apvyu';

var con = mysql.createConnection(env);


/* GET search de boleta page. */
router.get('/', function(req, res, next) {
  res.render('boleta-electronica/search');
});

router.get('/:id', function(req, res, next){
  var id = req.params.id;
  con.connect(function(err) {
    if (err) throw err;

    con.query("SELECT  id, campo1 AS adjudicatario, periodo, campo9 AS vencimiento,  STR_TO_DATE(campo9, '%d/%m/%Y') AS fecha_vto,  DATE(NOW()) AS fecha_hoy,  estado,  IF(estado = 'ABONADA' OR STR_TO_DATE(campo9, '%d/%m/%Y') > DATE(NOW()) , 'block', 'none') AS abonado,   IF(estado = 'ABONADA' OR STR_TO_DATE(campo9, '%d/%m/%Y') > DATE(NOW()), 'none', 'block') AS actualizar,   round(substr(campo25, 2, length(campo25)-1) +   substr(campo26, 2, length(campo26)-1) +   substr(campo27, 2, length(campo27)-1) +   substr(campo28, 2, length(campo28)-1) -   substr(campo31, 2, length(campo31)-1) +  substr(campo32, 2, length(campo32)-1) -   substr(campo33, 2, length(campo33)-1) +   substr(campo34, 2, length(campo34)-1) +   substr(campo35, 2, length(campo35)-1) +   substr(campo36, 2, length(campo36)-1) +   substr(campo101, 2, length(campo101)-1) +   substr(campo30, 2, length(campo30)-1), 2) AS importe FROM   boletas WHERE   substr(adj,1,5)= " + id + " ORDER BY periodo DESC limit 5", 
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
  
})

router.get('/print/:id', function(req,res,next){
  var id = req.params.id;

  var path = 'docs/boletas/'+id+'.pdf'
  var boleta = {};

  //const src = 'https://vivienda.larioja.gov.ar/boleta/makepdf.php?boleta_id='+id+'&peticion=imprimir';
  const output = appRoot + '/public/' + path;
  stream = fs.createWriteStream(output);
  const options = {
    protocol: 'https',
    host: 'vivienda.larioja.gov.ar',
    path: '/boleta/makepdf.php?boleta_id='+id+'&peticion=imprimir',
    method: 'POST'
};
let donwload = wget.request(options, function(response) {
    let content = '';
    if (response.statusCode === 200) {
        response.on('error', function(err) {
            console.log(err);
        });
        response.on('data', function(chunk) {
            content += chunk;
            stream.write(chunk);
        });
        response.on('end', function() {
            console.log(content.toString());
        });
    } else {
        console.log('Server respond ' + response.statusCode);
    }
  });
 
  donwload.end();
  donwload.on('error', function(err) {
      console.log(err);
  });

  //Se baja el pdf de la boleta en la carpeta /public/docs/boletas con el nombre de la id de la boleta.
  /*wget({
    url:  'https://vivienda.larioja.gov.ar/boleta/makepdf.php?boleta_id='+id+'&peticion=imprimir',
    dest: appRoot + '/public/' + path,
        // destination path or path with filenname, default is ./
    timeout: 2000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
    },
    function (error, response, body) {
      if (error) {
          console.log('--- error:');
          console.log(error);            // error encountered
      } else {
          console.log('--- headers:');
          console.log(response.headers); // response headers
          console.log('--- body:');
          console.log(body);             // content of package
      }
    }
  );*/
  boleta.path = path;
  
  res.render('boleta-electronica/print', {boleta : boleta});
  

});


module.exports = router;
