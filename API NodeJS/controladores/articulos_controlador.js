/* Importar modelo */

const Articulo = require("../modelos/articulos_modelos.js");
const mongoose = require("mongoose");
const fs = require("fs");
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
/* Peticiones GET */

let mostrarArticulo = (req, res) => {
	Articulo.find({}).exec((err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en tranmision",
			});
		}
		//Contar cantidad registros
		Articulo.countDocuments({}, (err, total) => {
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
let crearArticulo = (req, res) => {
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

	//creamos nueva carpeta a nombre de url
	let crearCarpeta = mkdirp.sync(`./archivos/articulos/${body.url}`);

	//Movemos archivo a carpeta
	archivo.mv(`./archivos/articulos/${body.url}/${nombre}.${extension}`, (err) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error al guardar la imagen",
				err,
			});
		}

		//Obtenemos los datos del formulario para pasarlos al modelo
		let articulo = new Articulo({
			portada: `${nombre}.${extension}`,
			titulo: body.titulo,
			contenido: body.contenido,
			intro: body.intro,
			url: body.url,
		});

		console.log("articulo", articulo);

		articulo.save((err, data) => {
			if (err) {
				return res.json({
					status: 400,
					mensaje: "Error durante almacenamiento de Articulo",
					err,
				});
			}
			res.json({
				status: 200,
				data,
				mensaje: "Articulo creado exitosamente",
			});
		});
	});
	//console.log(archivo);
	//console.log("Informacion obtenida");
	//return;
};

/* Peticiones PUT */
let editarArticulo = (req, res) => {
	//console.log("Probando");
	//Capturamos el id el articulo a actualizar

	let id = req.params.id;

	//obtenemos el cuerpo del formulario

	let body = req.body;

	//Validamos que el ID exista
	//mongoose.findByID
	Articulo.findById(id, (err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en el servidor",
			});
		}

		if (!data) {
			return res.json({
				status: 400,
				mensaje: "El articulo no existe en la BD",
				err,
			});
		}

		let rutaImagen = data.portada;

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
					archivo.mv(`./archivos/articulos/${data.url}/${nombre}.${extension}`);

					if (err) {
						let respuesta = {
							res: res,
							err: err,
						};
						reject(respuesta);

						//Boramos la antigua imagen
						if (fs.existsSync(`./archivos/articulos/${data.url}/${rutaImagen}`)) {
							fs.unlinkSync(`./archivos/articulos/${data.url}/${rutaImagen}`);
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
		let cambiarRegistrosDB = (id, body, rutaImagen) => {
			return new Promise((resolve, reject) => {
				let datosArticulo = {
					portada: rutaImagen,
					titulo: body.titulo,
					intro: body.intro,
					url: body.url,
					contenido: body.contenido
				};

				//Actualizamos mongoDb
				Articulo.findByIdAndUpdate(
					id,
					datosArticulo,
					{ new: true, runValidators: true },
					(err, data) => {
						if (err) {
							reject(err);
							return res.json({
								status: 400,
								mensaje: "Error al editar articulo en la BD",
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
				cambiarRegistrosDB(id, body, rutaImagen)
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
							mensaje: "Error al editar el articulo",
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


let borrarArticulo = (req,res)=>{

	//pedimos el id procedente del enlace
	let id = req.params.id;

	//Validamos que el ID exista
	//mongoose.findByID
	Articulo.findById(id, (err, data) => {
		if (err) {
			return res.json({
				status: 500,
				mensaje: "Error en el servidor",
			});
		}

		if (!data) {
			return res.json({
				status: 400,
				mensaje: "El articulo no existe en la BD",
				err,
			});
		}
		console.log("borrando");
		
		//Boramos la carpeta articulo
		let rutaCarpeta = `./archivos/articulos/${data.url}`;
		rimraf.sync(rutaCarpeta);

		//Borramos registro en MongoDB
		 Articulo.findByIdAndRemove(id, (err,data) =>{
		 	if (err) {
				return res.json({
					status: 500,
					mensaje: "Error al borrar el Articulo",
					err
				})
			}

			res.json({
				status:200,
				mensaje: "Articulo borrado correctamente"
			})
		 })
})
}


















/*let borrarArticulo (req, res)=>{
	let id = req.params.id;

	res.json({
		id
	})
}

/**Exportar funciones*/

module.exports = {
	mostrarArticulo,
	crearArticulo,
	editarArticulo,
	borrarArticulo
};