var express = require('express');
var router = express.Router();

var showRoute = 'requisitos/show-plan';

router.get('/', function(req, res, next){
    res.render('requisitos/index-requisitos');
  });

router.get('/edit',function(req, res, next){
    res.render('requisitos/edit');
});

  //Rutas para requisitos con terreno

router.get('/con-terreno', function(req, res, next){
    res.render('requisitos/index-con-terreno');
});

router.get('/sin-terreno', function(req, res, next){
    res.render('requisitos/index-sin-terreno');
});
router.get('/con-terreno/llave-en-mano', function(req,res,next){
    //Objeto plan, maneja los valores para la ruta show
    var plan = {
        descripcion: "Vivienda terminada en lote propio, destinado a personas solas o grupos familiares que cumplan con los requisitos establecidos en Ley 8.700 y sus reglamentarias",
        ingresoMin: 0,
        ingresoMax: 3,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Malanzan_Portezuelo/Malanzan_Portezuelo3.jpg",
        doc: "/docs/con-terreno/llave-en-mano.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/con-terreno/autoconstruccion-lote-propio', function(req,res,next){
    var plan = {
        descripcion: "Vivienda terminada en lote propio, con material y asistencia técnica aportada por APVyU y mano de obra aportada por el postulante. Destinado a personas solas y/o grupos familiares que cumplan con los requisitos establecidos en Ley 8.700 y sus reglamentarias",
        ingresoMin: 2,
        ingresoMax: 4,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Malanzan_Portezuelo/Malanzan_Portezuelo5.jpg",
        doc: "/docs/con-terreno/autoconstruccion-lote-propio.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/con-terreno/mejoramientos-habitacionales', function(req,res,next){
    var plan = {
        descripcion: "Finalización, refacción y/o ampliación de viviendas deficitarias. Destinado a postulantes",
        ingresoMin: 0,
        ingresoMax: 2,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Entrega_Ulapes/Ulapes1.jpg",
        doc: "/docs/con-terreno/mejoramientos-habitacionales.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/con-terreno/creditos-garantia', function(req,res,next){
    var plan = {
        descripcion: "Construcción y/o refacción de viviendas en lote propio. Destinado a personas y/o familias",
        ingresoMin: 2,
        ingresoMax: 4,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Malanzan_Portezuelo/Malanzan_Portezuelo7.jpg",
        doc: "/docs/con-terreno/creditos-garantia.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/sin-terreno/llave-en-mano', function(req,res,next){
    var plan = {
        descripcion: "Vivienda terminada en lote del Estado, destinado a personas solas o grupos familiares que cumplan con los requisitos establecidos en Ley 8.700 y sus reglamentarias",
        ingresoMin: 0,
        ingresoMax: 2,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Entrega_Ulapes/Ulapes6.jpg",
        doc: "/docs/sin-terreno/llave-en-mano.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/sin-terreno/mi-primer-hogar', function(req,res,next){
    var plan = {
        descripcion: "Vivienda terminada en lote del Estado, destinado a personas solas o grupos familiares que cumplan con los requisitos establecidos en Ley 8.700 y sus reglamentarias",
        ingresoMin: 2,
        ingresoMax: 4,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Entrega_Ulapes/Ulapes5.jpg",
        doc: "/docs/sin-terreno/mi-primer-hogar.pdf"

    };
    res.render(showRoute, {plan : plan});
});

router.get('/sin-terreno/autoconstruccion-lote-estado', function(req,res,next){
    var plan = {
        descripcion: "Vivienda terminada en lote del Estado, con material y asistencia técnica aportado por APVyU y mano de obra aportada por el postulante. Destinado a personas solas y/o grupos familiares que cumplan con los requisitos establecidos en Ley 8.700 y sus reglamentarias",
        ingresoMin: 2,
        ingresoMax: 4,
        img: "https://vivienda.larioja.gov.ar/images/Noticias/Entrega_Ulapes/Ulapes3.jpg",
        doc: "/docs/sin-terreno/autoconstruccion-lote-estado.pdf"

    };
    res.render(showRoute, {plan : plan});
});




module.exports = router;