
const express = require('express');

/* Creamos variable para tener funcionalidades de express */

const app = express();

/* importar controlador*/

const Articulo = require('../controladores/articulos_controlador.js');

//Rutas

app.get('/mostrar-articulos', Articulo.mostrarArticulo);
app.post('/crear-articulos', Articulo.crearArticulo);
app.put('/editar-articulos/:id', Articulo.editarArticulo);
app.delete('/borrar-articulos/:id', Articulo.borrarArticulo);
/* Exportar ruta */

module.exports = app;