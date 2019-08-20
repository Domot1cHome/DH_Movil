var datos = require("../Controlador/Datos");
var ruta = datos.rutaServicio;

export async function Loguearse(usuario, contraseña) {

  let consulta = await fetch(ruta + "Login.php?u=" + usuario + "&c=" + contraseña)
  let resultado = await consulta.json();
  var entrega;

  if (resultado[0] != undefined) {
    entrega = resultado[0];
  } else {
    entrega = null;
  }
  
  return entrega;

}



