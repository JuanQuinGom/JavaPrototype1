
const express = require('express');

/* Creamos variable para tener funcionalidades de express */

const app = express();

/* importar controlador*/

const Slide = require('../controladores/articulos_controlador.js');

//Rutas

app.get('/mostrar-articulo', Slide.mostrarArticulo);


/* Exportar ruta */

module.exports = app;