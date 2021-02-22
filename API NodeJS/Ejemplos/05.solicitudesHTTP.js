/** Requerimientos */


const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/* Creamos variable para tener funcionalidades de express */

const app = express()
/* Middleware para bodyParser, funciones que se ejecutan cuando se necesitan */

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/* Esquema modelo conector a MongoDB */

let Schema = mongoose.Schema;

let slideSchema = new Schema({

	imagen:{
		type:String,
		required: [true, "Imagen obligatoria"]
	},
	titulo:{
		type:String,
		required: false
	},
	descripcion:{
		type:String,
		required: false
	},
})


const Slide = mongoose.model("slides", slideSchema);



/* Peticiones GET */

app.get('/', (req, res)=>{

	Slide.find({}).exec((err, data)=>{
		if(err){
			return res.json({
				status:500,
				mensaje: "Error en tranmision"
			})
		}
		res.json({
			status: 200,
			data
		})
	})
})

/* Peticiones POST */
app.post('/crear-slide', (req, res)=>{
	let slide = req.body;

	res.json({
		slide
	})
})

/* Peticiones PUT */
app.put('/editar-slide/:id', (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
})


/* Peticiones DELETE */
app.delete('/borrar-slide/:id', (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
})

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

app.listen(4000, ()=>{
	console.log("Puerto 4k habilitado con express");
});
