/* Importar modelo */

const Articulo = require('../modelos/articulos_modelos.js');
const mongoose = require('mongoose');


/* Peticiones GET */

let mostrarArticulo =  (req, res)=>{

	Articulo.find({}).exec((err, data)=>{
		if(err){
			return res.json({
				status:500,
				mensaje: "Error en tranmision"
			})
		}
		//Contar cantidad registros
		Articulo.countDocuments({}, (err,total)=>{
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
/*let crearArticulo = (req, res)=>{
	let articulo = req.body;

	res.json({
		articulo
	})
}

/* Peticiones PUT */
/*let actualizarArticulo (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}


/* Peticiones DELETE */
/*let borrarArticulo (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}

/**Exportar funciones*/

module.exports = {
	mostrarArticulo

}