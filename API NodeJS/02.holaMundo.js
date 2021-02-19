/* Requerimientos */


const http = require('http')


http.createServer((req, res)=>{

	//res.write("Hola Juan");
	//res.end();

	/* JSON */
	res.writeHead(200, {'Content-type':'application/json'})

	let salida = {
		nombre : "Juan",
		edad: 37,
		url: req.url
	}
	res.write(JSON.stringify(salida));
	res.end();
})
.listen(4000);
console.log("Puerto 4000 habilitado")
