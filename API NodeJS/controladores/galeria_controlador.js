/* Importar modelo */

const Galeria = require("../modelos/galeria_modelos.js");
const mongoose = require("mongoose");
const fs = require("fs");

/* Peticiones GET */

let mostrarGaleria = (req, res) => {
	Galeria.find({}).exec((err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en tranmision",
			});
		}
		//Contar cantidad registros
		Galeria.countDocuments({}, (err, total) => {
			res.json({
				status: 200,
				total,
				data,
			});

			if (err) {
				return res.json({
					status: 500,
					mensaje: "Error en tranmision",
				});
			}
		});
	});
};

/* Peticiones POST */
let crearGaleria = (req, res) => {
	let body = req.body;
	//console.log(body);

	if (!req.files) {
		return res.json({
			status: 500,
			mensaje: "La imagen no puede ir vacia",
			err,
		});
	}

	//Capturamos el archivo
	let archivo = req.files.archivo;
	console.log("Archivo: \n", archivo);
	if (archivo.mimetype != "image/jpeg" && archivo.mimetype != "image/png") {
		return res.json({
			status: 400,
			mensaje: "La imagen debe ser formato JPEG o PNG",
		});
	}

	if (archivo.size > 2000000) {
		return res.json({
			status: 400,
			mensaje: "La imagen debe ser menor a 2Mb",
		});
	}

	//Cambiar nombre a archivo
	let nombre = Math.floor(Math.random() * 10000);

	console.log("Nombre", nombre);

	//Capturar extension
	let extension = archivo.name.split(".").pop();

	console.log("Extension", extension);

	//Movemos archivo a carpeta
	archivo.mv(`./archivos/galerias/${nombre}.${extension}`, (err) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error al guardar la imagen",
				err,
			});
		}

		//Obtenemos los datos del formulario para pasarlos al modelo
		let galeria = new Galeria({
			foto: `${nombre}.${extension}`,
		});

		console.log("galeria", galeria);

		galeria.save((err, data) => {
			if (err) {
				return res.json({
					status: 400,
					mensaje: "Error durante almacenamiento de Galeria",
					err,
				});
			}
			res.json({
				status: 200,
				data,
				mensaje: "Galeria creado exitosamente",
			});
		});
	});
	//console.log(archivo);
	//console.log("Informacion obtenida");
	//return;
};

/* Peticiones PUT */
let editarGaleria = (req, res) => {
	//console.log("Probando");
	//Capturamos el id el galeria a actualizar

	let id = req.params.id;

	//obtenemos el cuerpo del formulario

	let body = req.body;

	//Validamos que el ID exista
	//mongoose.findByID
	Galeria.findById(id, (err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en el servidor",
			});
		}

		if (!data) {
			return res.json({
				status: 400,
				mensaje: "El galeria no existe en la BD",
				err,
			});
		}

		let rutaImagen = data.foto;

		//Validamos el cambio de imagen
		let validarCambioArchivo = (req, rutaImagen) => {
			return new Promise((resolve, reject) => {
				if (req.files) {
					//Capturamos el archivo
					let archivo = req.files.archivo;
					console.log("Archivo: \n", archivo);
					if (
						archivo.mimetype != "image/jpeg" &&
						archivo.mimetype != "image/png"
					) {
						/*return res.json({
						status: 400,
						mensaje: "La imagen debe ser formato JPEG o PNG"
					})*/

						let respuesta = {
							res: res,
							mensaje: "La imagen debe ser formato JPEG o PNG",
						};
						reject(respuesta);
					}

					if (archivo.size > 2000000) {
						/*return res.json({
						status: 400,
						mensaje: "La imagen debe ser menor a 2Mb"
					})*/

						let respuesta = {
							res: res,
							mensaje: "La imagen debe ser menor a 2Mb",
						};
					}

					//Cambiar nombre a archivo
					let nombre = Math.floor(Math.random() * 10000);

					console.log("Nombre", nombre);

					//Capturar extension
					let extension = archivo.name.split(".").pop();
					archivo.mv(`./archivos/galerias/${nombre}.${extension}`);

					if (err) {
						let respuesta = {
							res: res,
							err: err,
						};
						reject(respuesta);

						//Boramos la antigua imagen
						if (fs.existsSync(`./archivos/galerias/${rutaImagen}`)) {
							fs.unlinkSync(`./archivos/galerias/${rutaImagen}`);
						}

						//Damos valor a la nueva imagen

						/*return res.json({
						status:500,
						mensaje:"Error al guardar imagen",
						err
					})*/
					}

					rutaImagen = `${nombre}.${extension}`;

					resolve(rutaImagen);
				} else {
					resolve(rutaImagen);
				}
			});
		};

		//Actualizamos los registros
		let cambiarRegistrosDB = (id, rutaImagen) => {
			return new Promise((resolve, reject) => {
				let datosGaleria = {
					foto: rutaImagen,
				};

				//Actualizamos mongoDb
				Galeria.findByIdAndUpdate(
					id,
					datosGaleria,
					{ new: true, runValidators: true },
					(err, data) => {
						if (err) {
							reject(err);
							return res.json({
								status: 400,
								mensaje: "Error al editar la galeria en la BD",
								err,
							});
						}

						let respuesta = {
							res: res,
							data: data,
						};
						resolve(respuesta);
					}
				);
			});
		};

		/* Sincronizando las promesas*/

		validarCambioArchivo(req, rutaImagen)
			.then((rutaImagen) => {
				cambiarRegistrosDB(id, rutaImagen)
					.then((respuesta) => {
						respuesta["res"].json({
							status: 200,
							data: respuesta["data"],
							mensaje: "Actualizado exitosamente",
						});
					})
					.catch((respuesta) => {
						respuesta["res"].json({
							status: 400,
							data: respuesta["data"],
							mensaje: "Error al editar la galeria",
						});
					});
			})
			.catch((respuesta) => {
				respuesta["res"].json({
					status: 400,
					mensaje: respuesta["mensaje"],
				});
			});
	});
};

/* Peticiones DELETE */


let borrarGaleria = (req,res)=>{

	//pedimos el id procedente del enlace
	let id = req.params.id;

	//Validamos que el ID exista
	//mongoose.findByID
	Galeria.findById(id, (err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en el servidor",
			});
		}

		if (!data) {
			return res.json({
				status: 400,
				mensaje: "La galeria no existe en la BD",
				err,
			});
		}
		console.log("borrando");
		//Boramos la antigua imagen
		if (fs.existsSync(`./archivos/galerias/${data.foto}`)) {
			fs.unlinkSync(`./archivos/galerias/${data.foto}`);
		}

		//Borramos registro en MongoDB
		 Galeria.findByIdAndRemove(id, (err,data) =>{
		 	if (err) {
				return res.json({
					status: 500,
					mensaje: "Error al borrar la imagen",
					err
				})
			}

			res.json({
				status:200,
				mensaje: "Galeria borrado correctamente"
			})
		 })
})
}


















/*let borrarGaleria (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}

/**Exportar funciones*/

module.exports = {
	mostrarGaleria,
	crearGaleria,
	editarGaleria,
	borrarGaleria
};