-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-08-2019 a las 05:12:16
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `domotic_home_bd`
--
CREATE DATABASE IF NOT EXISTS `domotic_home_bd` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `domotic_home_bd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ambiente`
--

CREATE TABLE `tb_ambiente` (
  `amb_id` int(11) NOT NULL,
  `amb_nombre` varchar(40) NOT NULL,
  `amb_capacidad` int(2) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modificado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_ambiente`
--

INSERT INTO `tb_ambiente` (`amb_id`, `amb_nombre`, `amb_capacidad`, `fecha_creado`, `fecha_modificado`) VALUES
(1, 'Ambiente A', 22, '2019-08-15 22:24:19', '2019-08-15 22:24:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ambiente_componente`
--

CREATE TABLE `tb_ambiente_componente` (
  `amb_com_id` int(11) NOT NULL,
  `amb_id` int(11) NOT NULL,
  `com_id` int(11) NOT NULL,
  `com_estado` tinyint(1) NOT NULL,
  `com_estado_detalle` int(1) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modificado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_ambiente_componente`
--

INSERT INTO `tb_ambiente_componente` (`amb_com_id`, `amb_id`, `com_id`, `com_estado`, `com_estado_detalle`, `fecha_creado`, `fecha_modificado`) VALUES
(1, 1, 1, 0, 0, '2019-08-15 22:45:01', '2019-08-15 22:45:01'),
(2, 1, 2, 0, 0, '2019-08-15 22:45:01', '2019-08-15 22:45:01'),
(3, 1, 3, 0, 0, '2019-08-15 22:45:01', '2019-08-15 22:45:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_componente`
--

CREATE TABLE `tb_componente` (
  `com_id` int(11) NOT NULL,
  `com_nombre` varchar(40) NOT NULL,
  `com_tip_com_id` int(11) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modifcado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_componente`
--

INSERT INTO `tb_componente` (`com_id`, `com_nombre`, `com_tip_com_id`, `fecha_creado`, `fecha_modifcado`) VALUES
(1, 'Lampara Ambiente A', 3, '2019-08-15 22:32:54', '2019-08-15 22:32:54'),
(2, 'Aire Ambiente A', 1, '2019-08-15 22:32:54', '2019-08-15 22:32:54'),
(3, 'Ventilador Ambiente A', 2, '2019-08-15 22:32:54', '2019-08-15 22:32:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_rol`
--

CREATE TABLE `tb_rol` (
  `rol_id` int(11) NOT NULL,
  `rol_nombre` varchar(40) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modificado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_rol`
--

INSERT INTO `tb_rol` (`rol_id`, `rol_nombre`, `fecha_creado`, `fecha_modificado`) VALUES
(1, 'Super usuario', '2019-08-15 22:28:09', '2019-08-15 22:28:09'),
(2, 'Usuario', '2019-08-15 22:28:09', '2019-08-15 22:28:09'),
(3, 'Supervisor', '2019-08-18 16:25:49', '2019-08-18 16:25:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_componente`
--

CREATE TABLE `tb_tipo_componente` (
  `tip_id` int(11) NOT NULL,
  `tip_nombre` varchar(40) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modificado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_tipo_componente`
--

INSERT INTO `tb_tipo_componente` (`tip_id`, `tip_nombre`, `fecha_creado`, `fecha_modificado`) VALUES
(1, 'Aires Acondicionados', '2019-08-15 22:25:23', '2019-08-15 22:25:23'),
(2, 'Ventiladores', '2019-08-15 22:25:23', '2019-08-15 22:25:23'),
(3, 'Lamparas', '2019-08-15 22:25:23', '2019-08-15 22:25:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_documento`
--

CREATE TABLE `tb_tipo_documento` (
  `tip_doc_id` int(11) NOT NULL,
  `tip_doc_nombre` varchar(30) NOT NULL,
  `fecha_creado` datetime NOT NULL,
  `fecha_modificado` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_tipo_documento`
--

INSERT INTO `tb_tipo_documento` (`tip_doc_id`, `tip_doc_nombre`, `fecha_creado`, `fecha_modificado`) VALUES
(1, 'Tarjeta de identidad', '2019-08-15 22:27:06', '2019-08-15 22:27:06'),
(2, 'Cedúla de ciudadanía', '2019-08-15 22:27:06', '2019-08-15 22:27:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(50) NOT NULL,
  `usu_apellido` varchar(50) NOT NULL,
  `usu_tip_doc_id` int(11) NOT NULL,
  `usu_num_doc` varchar(40) NOT NULL,
  `usu_rol_id` int(11) NOT NULL,
  `usu_email` varchar(50) NOT NULL,
  `usu_usuario` varchar(30) NOT NULL,
  `usu_codigo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tb_usuario`
--

INSERT INTO `tb_usuario` (`usu_id`, `usu_nombre`, `usu_apellido`, `usu_tip_doc_id`, `usu_num_doc`, `usu_rol_id`, `usu_email`, `usu_usuario`, `usu_codigo`) VALUES
(1, 'Luis Alejandro', 'Muñoz Puentes', 2, '1118311424', 1, 'alemupx@gmail.com', 'a', '123'),
(2, 'NULL NULL', 'NULL NULL', 1, '99071102706', 2, 'soulboyx99@outlook.com', 'lxaxmxp', 'V3rd1l4c');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_ambiente`
--
ALTER TABLE `tb_ambiente`
  ADD PRIMARY KEY (`amb_id`);

--
-- Indices de la tabla `tb_ambiente_componente`
--
ALTER TABLE `tb_ambiente_componente`
  ADD PRIMARY KEY (`amb_com_id`),
  ADD KEY `amb_id` (`amb_id`),
  ADD KEY `com_id` (`com_id`);

--
-- Indices de la tabla `tb_componente`
--
ALTER TABLE `tb_componente`
  ADD PRIMARY KEY (`com_id`),
  ADD KEY `com_tip_com_id` (`com_tip_com_id`);

--
-- Indices de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `tb_tipo_componente`
--
ALTER TABLE `tb_tipo_componente`
  ADD PRIMARY KEY (`tip_id`);

--
-- Indices de la tabla `tb_tipo_documento`
--
ALTER TABLE `tb_tipo_documento`
  ADD PRIMARY KEY (`tip_doc_id`);

--
-- Indices de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`usu_id`),
  ADD KEY `usu_tip_doc_id` (`usu_tip_doc_id`),
  ADD KEY `usu_rol_id` (`usu_rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_ambiente`
--
ALTER TABLE `tb_ambiente`
  MODIFY `amb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tb_ambiente_componente`
--
ALTER TABLE `tb_ambiente_componente`
  MODIFY `amb_com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_componente`
--
ALTER TABLE `tb_componente`
  MODIFY `com_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_rol`
--
ALTER TABLE `tb_rol`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_componente`
--
ALTER TABLE `tb_tipo_componente`
  MODIFY `tip_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_documento`
--
ALTER TABLE `tb_tipo_documento`
  MODIFY `tip_doc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_ambiente_componente`
--
ALTER TABLE `tb_ambiente_componente`
  ADD CONSTRAINT `tb_ambiente_componente_ibfk_1` FOREIGN KEY (`amb_id`) REFERENCES `tb_ambiente` (`amb_id`),
  ADD CONSTRAINT `tb_ambiente_componente_ibfk_2` FOREIGN KEY (`com_id`) REFERENCES `tb_componente` (`com_id`);

--
-- Filtros para la tabla `tb_componente`
--
ALTER TABLE `tb_componente`
  ADD CONSTRAINT `tb_componente_ibfk_1` FOREIGN KEY (`com_tip_com_id`) REFERENCES `tb_tipo_componente` (`tip_id`);

--
-- Filtros para la tabla `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD CONSTRAINT `tb_usuario_ibfk_1` FOREIGN KEY (`usu_tip_doc_id`) REFERENCES `tb_tipo_documento` (`tip_doc_id`),
  ADD CONSTRAINT `tb_usuario_ibfk_2` FOREIGN KEY (`usu_rol_id`) REFERENCES `tb_rol` (`rol_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
