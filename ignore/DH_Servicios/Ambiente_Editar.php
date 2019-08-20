<?php

$id = $_GET["i"];
$nombre = $_GET["n"];
$cantidad = $_GET["c"];

try {
    $datosConexion = new mysqli("localhost", "root", "", "domotic_home_bd");
    $consulta = "UPDATE tb_ambiente A SET A.amb_nombre='" . $nombre . "', A.amb_capacidad='" . $cantidad . "',A.fecha_modificado=now() WHERE A.amb_id='" . $id . "'";

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
