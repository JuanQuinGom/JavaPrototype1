const mongoose = require('mongoose');

/* Esquema modelo conector a MongoDB */

let Schema = mongoose.Schema;

let articulosSchema = new Schema({

	portada:{
		type:String,
		required: [true, "Imagen obligatoria"]
	},
	titulo:{
		type:String,
		required: [true, "Titulo obligatoria"]
	},
	intro:{
		type:String,
		required: [true, "Introduccion obligatoria"]
	},
	url:{
		type:String,
		required: [true, "URL obligatoria"]
	},
	contenido:{
		type:String,
		required: [true, "Contenido obligatoria"]
	},
})
/*Exportar modulo */

//const Articulos = mongoose.model("slides", articulosSchema);
module.exports = mongoose.model("articulos", articulosSchema);