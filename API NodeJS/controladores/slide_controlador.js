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
	let slide = req.body;

	res.json({
		slide
	})
}

/* Peticiones PUT */
/*let actualizarSlide (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
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