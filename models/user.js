var wget = require('node-wget');

wget({
    url:  'https://vivienda.larioja.gov.ar/boleta/makepdf.php',
    dest: './pdf.pdf',      // destination path or path with filenname, default is ./
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
);