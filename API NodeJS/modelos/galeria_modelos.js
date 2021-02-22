const mongoose = require('mongoose');

/* Esquema modelo conector a MongoDB */

let Schema = mongoose.Schema;

let galeriaSchema = new Schema({

	foto:{
		type:String,
		required: [true, "Imagen obligatoria"]
	},
})

/*Exportar modulo */

//const Articulos = mongoose.model("slides", articulosSchema);
module.exports = mongoose.model("galerias", galeriaSchema);