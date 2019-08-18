var datos = require("../Controlador/Datos");
var direccionIp = datos.direccionIp;

export async function Loguearse(email, contraseña) {

  let foo = await fetch("http://"+direccionIp+"/ServiciosxDH/ServicioLoguarse.php?e="+email+"&c="+contraseña)
  let baz = await foo.json();
  var bar;

  if(baz[0]!=undefined){
	bar = baz[0];
  }else{
  	bar =  null;
  }

  return bar;
  
}



