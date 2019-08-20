<?php
    
try {
	$datosConexion = new mysqli("localhost", "root", "", "domotic_home_bd");
    $consulta = "SELECT * FROM tb_ambiente";
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
