<?php
    $usuario = $_GET["u"];
	$codigo = $_GET["c"];
try {
	$datosConexion = new mysqli("localhost", "root", "", "domotic_home_bd");
    $consulta = "SELECT U.usu_rol_id,U.usu_usuario, U.usu_codigo FROM tb_usuario AS U WHERE U.usu_usuario='".$usuario."' AND U.usu_codigo='".$codigo."'";
    $arreglo = array();
	
	if ($resultado = $datosConexion->query($consulta)) {
        while($fila = $resultado->fetch_object()) {            
			array_push($arreglo, $fila);
        }           
        echo json_encode($arreglo);
    }

} catch (Exception $e) {
	echo $e;
}
