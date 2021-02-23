
const express = require('express');

/* Creamos variable para tener funcionalidades de express */

const app = express();

/* importar controlador*/

const Galeria = require('../controladores/galeria_controlador.js');

//Rutas

app.get('/mostrar-galeria', Galeria.mostrarGaleria);
app.post('/crear-galeria', Galeria.crearGaleria);
app.put('/editar-galeria/:id', Galeria.editarGaleria);
app.delete('/borrar-galeria/:id', Galeria.borrarGaleria);
/* Exportar ruta */

module.exports = app;