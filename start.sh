
#!/bin/sh
echo Iniciando terminal de autoservicio APVyU...
## Borrar todos los documentos pdf de la carpeta docs cada vez que se levanta el servidor
rm ./public/docs/*.pdf

## Iniciar el servidor Express

npm start

 

