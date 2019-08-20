<?php

$nombre = $_GET["n"];
$cantidad = $_GET["c"];

try {
    $datosConexion = new mysqli("localhost", "root", "", "domotic_home_bd");
    
    $consulta = "INSERT INTO tb_ambiente (amb_id, amb_nombre, amb_capacidad,fecha_creado,fecha_modificado) VALUES (NULL, '".$nombre."', '".$cantidad."',NOW(),NOW());";

    $arreglo = array(1);

    if ($resultado = $datosConexion->query($consulta)) {
        if ($resultado == 1) {
            $arreglo = [true];
            echo json_encode($arreglo);
        }
    }
} catch (Exception $e) {
    echo $e;
}
