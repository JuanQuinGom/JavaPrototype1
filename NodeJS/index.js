/*======================================
=            requerimientos            =
======================================*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
/*======================================
=            variable para todas las funcionalidades de express            =
======================================*/
const app = express()

/*=============================================
=            Section comment block            =
=============================================*/
// parse application/ x www form urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

/*===================================================
=            ESQUEMA CONECTOR A MONGOOSE            =
===================================================*/

let Schema = mongoose.Schema;

let slideSchema = new Schema ({
	imagen:{
		type:String, 
		required: [true, "La imagen es obligatoria"]
	},
	titulo:{
		type:String, 
		required: [false, "El titulo es obligatoria"]
	},
	descripcion:{
		type:String, 
		required: false,
	},
})

let Slide = mongoose.model("slides", slideSchema);

/*Peticion get*/
/*======================================
=            PETICIONES GET            =
======================================*/


app.get('/',(req,res)=>{

		Slide.find({}).exec((err,data)=>{
			if (err) {
				return res.json({
				status:500,
				mensaje:'Error en peticion'
				})
			}
			res.json({
				status:200,
				data
			})
		})
	//res.send("Hola mundo");
	/*let salida = {
		nombre: 'Juan',
		edad: 37,
		url: req.url
	}
	res.send(salida);*/
})

/*======================================
=            PETICIONES POST            =
======================================*/
app.post('/crear-slide', (req,res)=>{
	let slide = req.body;

	res.json({
		slide
	})
})


/*======================================
=            PETICIONES put            =
======================================*/
app.put('/editar-slide/:id', (req,res)=>{
	let id = req.params.id;

	res.json({
		id
	}
)})



/*======================================
=            PETICIONES DELETE            =
======================================*/
app.delete('/borrar-slide/:id', (req,res)=>{
	let id = req.params.id;

	res.json({
		id
	})
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