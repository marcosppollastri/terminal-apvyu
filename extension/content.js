
// $(".extension").append('<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
// +
// '<button type="button" class="btn btn-large btn-block btn-primary" onclick="window.history.go(-1); return false;" id="boton-atras"><i class="fas fa-caret-left"> Atras</i></button> </div>'
// +
// '<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
// +'<button type="button" class="btn btn-primary btn-block"><i class="fas fa-home"> Inicio</i></button></div>');


// $(".footer").append('<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
// +
// '<button type="button" class="btn btn-large btn-block btn-primary" onclick="window.history.go(-1); return false;" id="boton-atras"><i class="fas fa-caret-left"> Atras</i></button> </div>'
// +
// '<div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">'
// +'<button type="button" class="btn btn-primary btn-block"><i class="fas fa-home"> Inicio</i></button></div>');

var html = 
'<div class="row">'
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
+ '</div>';

if ($(location).attr('href') === "http://localhost:3000/") {
    html = '';
}

$("footer").append(html);

            
            
                
                    
                    
                    
                    
                
                
                    
                    
                    
            