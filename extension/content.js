//Variable que toma la direccion url donde nos encontramos posicionados
var url = $(location).attr('href');
//Variable con el string del css que debemos usar
var css = '<link rel="stylesheet" href="http://localhost:3000/static/stylesheets/styleAPVyU.css">';
//EXpresión regular que se usara para evaluar si nos encontramos en localhost o no
var regex = new RegExp("https?:\/\/(www\.)?localhost:3000\/");
//HTML de los botones de navegación
var html = 
'<footer>'
+'<div class="container">'
    + '<div class="row">'
        + '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">'
            + '<div class="row foot extension">'
                + '<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
                    + '<button type="button" class="btn btn-large btn-block btn-primary" onclick="window.history.go(-1); return false;" id="boton-atras"><i class="fas fa-caret-left"> Atras</i></button>'
                + '</div>'
                + '<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
                    + '<a href="http://localhost:3000/"><button type="button" class="btn btn-primary btn-block"><i class="fas fa-home"> Inicio</i></button></a>'
                + '</div>'
            + '</div>'
        + '</div>'
    + '</div>'
+ '</div>'
+'</footer>';

//si nos encontramos en raiz, no se deben incluir los botones
if (url === "http://localhost:3000/") {
    html = '';
}

//Si nos encontramos fuera de localhost, debemos añadir el css especificado
if(!regex.test(url)){
    $("head").append(css);
}
//Borrar cualquier footer que pueda descompaginar la negación
$("footer").remove();

//añadir botones de navegación
$("body").append(html);



            
            
                
                    
                    
                    
                    
                
                
                    
                    
                    
            