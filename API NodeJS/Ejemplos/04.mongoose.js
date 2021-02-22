/* Requerimientos */


const http = require('http')
const express = require('express')
const mongoose = require('mongoose')

/* Creamos variable para tener funcionalidades de express */

const app = express()

/* Peticiones gET */

app.get('', (req, res)=>{

	//res.send("hola Mundo");
	let salida = {
		nombre : "Juan",
		edad: 23,
		url: req.url
	}

	res.send(salida);
})
/* Conexion a BD */
await mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err,res)=>{
	if (err) throw err;

	console.log("Conectado a la base de datos");
});


/* Salida puerto HTTP */

app.listen(4000, ()=>{
	console.log("Puerto 4k habilitado con express");
});

