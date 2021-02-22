
const express = require('express');

/* Creamos variable para tener funcionalidades de express */

const app = express();

/* importar controlador*/

const Slide = require('../controladores/slide_controlador.js');

//Rutas

app.get('/mostrar-slide', Slide.mostrarSlide);
app.post('/crear-slide', Slide.crearSlide);

/* Exportar ruta */

module.exports = app;