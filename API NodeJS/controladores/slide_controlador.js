/* Importar modelo */

const Slide = require('../modelos/slide_modelos.js');
const mongoose = require('mongoose');


/* Peticiones GET */

let mostrarSlide =  (req, res)=>{

	Slide.find({}).exec((err, data)=>{
		if(err){
			return res.json({
				status:500,
				mensaje: "Error en tranmision"
			})
		}
		//Contar cantidad registros
		Slide.countDocuments({}, (err,total)=>{
					res.json({
					status: 200,
					total,
					data
				})

				if(err){
					return res.json({
						status:500,
						mensaje: "Error en tranmision"
					}) 
				}
		})
	})
}

/* Peticiones POST */
let crearSlide = (req, res)=>{
	let body = req.body;
	//console.log(body);

	if(!req.files){
		return res.json({
			status: 500,
			mensaje: "La imagen no puede ir vacia", 
			err
		})
	}


	//Capturamos el archivo
	let archivo = req.files.archivo;
	console.log("Archivo: \n", archivo)
	if (archivo.mimetype != 'image/jpeg' && archivo.mimetype != 'image/png'){
		return res.json({
			status: 400,
			mensaje: "La imagen debe ser formato JPEG o PNG"
		})
	}

	if (archivo.size > 2000000){
		return res.json({
			status: 400,
			mensaje: "La imagen debe ser menor a 2Mb"
		})
	}

	//Cambiar nombre a archivo
	let nombre = Math.floor(Math.random()*10000);

	console.log("Nombre", nombre);

	//Capturar extension
	let extension = archivo.name.split('.').pop();

	console.log("Extension", extension);

	//Movemos archivo a carpeta
	archivo.mv(`./archivos/slides/${nombre}.${extension}`, err =>{
		if(err){
			return res.json({
			status: 500,
			mensaje: "Error al guardar la imagen",
			err
		})
		}

		//Obtenemos los datos del formulario para pasarlos al modelo
	let slide = new Slide({
		imagen: `${nombre}.${extension}`,
		titulo: body.titulo,
		descripcion: body.descripcion
	})

	console.log("slide", slide)

	slide.save((err, data)=> {
		if(err){
			return res.json({
				status: 400,
				mensaje: "Error durante almacenamiento de Slide", 
				err
			})
		}
		res.json({
			status: 200,
			data,
			mensaje: "Slide creado exitosamente",
		})
	})


	})
	//console.log(archivo);
	//console.log("Informacion obtenida");
	//return;

	
}

/* Peticiones PUT */
let editarSlide = (req, res) =>{

	//Capturamos el id el slide a actualizar

	let id = req.params.id;

	//obtenemos el cuerpo del formulario

	let body = req.body;

	//Validamos que el ID exista

	//Validamos el cambio de imagen

	//Actualizamos los registros
	

}


/* Peticiones DELETE */
/*let borrarSlide (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}

/**Exportar funciones*/

module.exports = {
	mostrarSlide,
	crearSlide,

}