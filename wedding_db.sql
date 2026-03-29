-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-03-2026 a las 20:08:35
-- Versión del servidor: 8.0.32
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wedding_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'Alvaro', '$2b$10$V1v/gRQa8yCmVtX21UT1vuASWc1vONveCQ3t7wRtmwypkdCpie3Cq', '2026-03-22 18:02:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `companions`
--

CREATE TABLE `companions` (
  `id` int NOT NULL,
  `guest_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `diet` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `companions`
--

INSERT INTO `companions` (`id`, `guest_id`, `name`, `diet`) VALUES
(6, 3, 'Acompañante 1', 'vegetariano'),
(7, 1, 'Acompanante 1', 'Yeyeh'),
(8, 1, 'Acompanante 2', 'Yeyeh'),
(9, 1, 'Acompanante 3', 'Yeyeh'),
(10, 1, 'Acompanante 4', 'Yeyeh'),
(11, 1, 'Acompanante 5', 'Yeyeh');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guests`
--

CREATE TABLE `guests` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `attendance` enum('pending','yes','no') DEFAULT 'pending',
  `guests_count` int DEFAULT '0',
  `diet` varchar(100) DEFAULT NULL,
  `song` varchar(100) DEFAULT NULL,
  `message` text,
  `invitation_code` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `table_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `guests`
--

INSERT INTO `guests` (`id`, `name`, `email`, `phone`, `attendance`, `guests_count`, `diet`, `song`, `message`, `invitation_code`, `created_at`, `table_id`) VALUES
(1, 'Andariana', 'alpeso@sdjs.cds', NULL, 'yes', 6, 'Yeyeh', 'Hdhdh', 'Con amor', 'BHWQ6K', '2026-03-22 18:32:25', NULL),
(2, 'Pedro', 'al@gmail.com', NULL, 'yes', 12, 'qweqwe', 'qweqw', 'qewqw', 'YUJ9E8', '2026-03-22 18:47:30', NULL),
(3, 'Test Invitado', 'test@example.com', '123456789', 'yes', 2, 'vegetariano', 'Asere', 'Con gusto', 'EKIHQ3', '2026-03-22 19:16:22', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rsvp_logs`
--

CREATE TABLE `rsvp_logs` (
  `id` int NOT NULL,
  `guest_id` int DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tables`
--

CREATE TABLE `tables` (
  `id` int NOT NULL,
  `table_number` int DEFAULT NULL,
  `capacity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `companions`
--
ALTER TABLE `companions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indices de la tabla `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invitation_code` (`invitation_code`),
  ADD KEY `table_id` (`table_id`);

--
-- Indices de la tabla `rsvp_logs`
--
ALTER TABLE `rsvp_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guest_id` (`guest_id`);

--
-- Indices de la tabla `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `companions`
--
ALTER TABLE `companions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rsvp_logs`
--
ALTER TABLE `rsvp_logs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `companions`
--
ALTER TABLE `companions`
  ADD CONSTRAINT `companions_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `guests_ibfk_1` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`);

--
-- Filtros para la tabla `rsvp_logs`
--
ALTER TABLE `rsvp_logs`
  ADD CONSTRAINT `rsvp_logs_ibfk_1` FOREIGN KEY (`guest_id`) REFERENCES `guests` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
