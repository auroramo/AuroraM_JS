//visitar la documentacion nodejs.org

// Ejemplo 1
/*
var http=require("http"); //para usar HTTP de nodejs
console.log("Inicio");
var host="127.0.0.1";
var port=1337;
//http://nodejs.org/api/http.html#http_http_createserver_requestlistener
var server=http.createServer(function(request,response){  //Returns a new web server object.
	console.log("Petición recibida: "+request.url);
	response.writeHead(200,{"Content-type":"text/plain"});
	response.end("Hola mundo");
});
server.listen(port,host,function(){  //This will cause the server to accept connections on the specified handle,
// but it is presumed that the file descriptor or handle has already been bound to a port or domain socket. --Asíncrona
	console.log("Escuchando "+host+":"+port)
}); //va escribiendo en en Node.js command prompt las peticiones y en el navegador pone "Hola Mundo"
*/

// Ejemplo 2
//Para este ejemplo hay que crear un directorio public (/node/public)
//e introducir en ese directorio un archivo html
// (poner en navegador direccion http://localhost:1337/hola.html -sin ejecutar servidor no debe funcionar-)
/*
var http=require("http");
var fs=require("fs");
console.log("Inicio2");
var host="127.0.0.1";
var port=1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});  //va escribiendo en en Node.js command prompt las peticiones y en el navegador se muestra el archivo .html pedido
*/


//Ejemplo 3
//Leemos la configuración (host y puerto) desde el archivo json (config.json)
//prueba modificar la configuracion

var http=require("http");
var fs=require("fs");
console.log("Inicio");
var config=JSON.parse(fs.readFileSync("config.json"));
var host=config.host;//"127.0.0.1";
var port=config.port;//1337;
var server=http.createServer(function(request,response){
	console.log("Petición recibida:"+request.url);
	fs.readFile("./public"+request.url,function(error,data){
		if(error){
			response.writeHead(404,{"Content-type":"text/plain"});
			response.end("Lo siento, página no encontrada");
		}
		else{
			response.writeHead(200,{"Content-type":"text/html"});
			response.end(data);
		}
	})
	//response.writeHead(200,{"Content-type":"text/plain"});
	//response.end("Hola mundo");
});
server.listen(port,host,function(){
	console.log("Escuchando "+host+":"+port)
});
fs.watchFile("config.json",function(){  //Watch for changes on filename. The callback listener will be called each time the file is accessed.
	config=JSON.parse(fs.readFileSync("config.json"));
	server.close();
	server.listen(config.port,config.host,function(){
		console.log("Escuchando "+config.host+":"+config.port)
	});
})  //Cada vez que se modifica el archivo (si se cambia el nombre peta el servidor) y se guardan los cambios, 
//sale la neva dirección y/o puerto (si no se modifica pero se da a guardar también vuelve a mostrar la frase) 
