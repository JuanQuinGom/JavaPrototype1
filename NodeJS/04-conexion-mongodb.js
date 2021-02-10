/*======================================
=            requerimientos            =
======================================*/

const express = require('express')
const mongoose = require('mongoose');

/*======================================
=            variable para todas las funcionalidades de express            =
======================================*/
const app = express()

/*Peticion get*/
app.get('/a',(req,res)=>{
	//res.send("Hola mundo");
	let salida = {
		nombre: 'Juan',
		edad: 37,
		url: req.url
	}
	res.send(salida);
})
/*================================================
=            CONEXION A BASE DE DATOS`            =
===========================================*/
mongoose.connect('mongodb://localhost:27017/apirest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err,req)=>{
	if(err) throw err;

	console.log("Conectado a la base de datos")
});


/*salida puerto http*/
app.listen(4000, ()=>{
	console.log("Puerto 4000 Habilitado");
})