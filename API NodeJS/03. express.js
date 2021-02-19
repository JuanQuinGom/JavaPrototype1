/* Requerimientos */


const http = require('http')
const express = require('express')

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

/* Salida puerto HTTP */

app.listen(4000, ()=>{
	console.log("Puerto 4k habilitado con express");
});
