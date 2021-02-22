/* Importar modelo */

const Galeria = require('../modelos/galeria_modelos.js');
const mongoose = require('mongoose');


/* Peticiones GET */

let mostrarGaleria =  (req, res)=>{

	Galeria.find({}).exec((err, data)=>{
		if(err){
			return res.json({
				status:500,
				mensaje: "Error en tranmision"
			})
		}
		//Contar cantidad registros
		Galeria.countDocuments({}, (err,total)=>{
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
/*let crearGaleria = (req, res)=>{
	let galeria = req.body;

	res.json({
		galeria
	})
}

/* Peticiones PUT */
/*let actualizarGaleria (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}


/* Peticiones DELETE */
/*let borrarGaleria (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}

/**Exportar funciones*/

module.exports = {
	mostrarGaleria

}