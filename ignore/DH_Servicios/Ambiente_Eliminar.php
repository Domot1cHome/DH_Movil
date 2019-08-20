<?php

$id = $_GET["id"];

try {
    $datosConexion = new mysqli("localhost", "root", "", "domotic_home_bd");
    $consulta = "DELETE FROM tb_ambiente WHERE tb_ambiente.amb_id=" . $id;

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
