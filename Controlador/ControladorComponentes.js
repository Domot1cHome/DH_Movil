var datos = require("../Controlador/Datos");
var direccionIp = datos.direccionIp;

export async function Loguearse(email, contraseña) {

  let foo = await fetch("http://"+direccionIp+"/ServiciosxDH/ServicioIniciarComponentes.php?id=");
  let baz = await foo.json();
  var bar;

  
}



