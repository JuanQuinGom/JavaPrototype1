/** Requerimientos */

require('./config.js');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
/* Creamos variable para tener funcionalidades de express */

const app = express()


/* Middleware para bodyParser, funciones que se ejecutan cuando se necesitan */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
 
// parse application/json
app.use(bodyParser.json({ limit: '10mb', extended: true }))

/* Middleware para express file upload */
app.use(fileUpload());


/* Importaciones de las rutas */
app.use(require('./rutas/slide_ruta.js'));
app.use(require('./rutas/galeria_ruta.js'));
app.use(require('./rutas/articulos_ruta.js'));


/* Conexion a BD */
mongoose.connect('mongodb://localhost:27017/apirest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err,res)=>{
	if (err) throw err;

	console.log("Conectado a la base de datos");
});


/* Salida puerto HTTP */

app.listen(process.env.PORT, ()=>{
	console.log(`Puerto ${process.env.PORT} habilitado con express`);
});
