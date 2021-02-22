const mongoose = require('mongoose');

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

/*Exportar modulo */

//const Articulos = mongoose.model("slides", articulosSchema);
module.exports = mongoose.model("slides", slideSchema);