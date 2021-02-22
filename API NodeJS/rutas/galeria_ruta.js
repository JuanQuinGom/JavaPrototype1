
const express = require('express');

/* Creamos variable para tener funcionalidades de express */

const app = express();

/* importar controlador*/

const Slide = require('../controladores/galeria_controlador.js');

//Rutas

app.get('/mostrar-galeria', Slide.mostrarGaleria);


/* Exportar ruta */

module.exports = app;