-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.3.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for dms
CREATE DATABASE IF NOT EXISTS `dms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dms`;

-- Dumping structure for table dms.documents
CREATE TABLE IF NOT EXISTS `documents` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type_id` int(11) DEFAULT NULL,
  `doc_name` varchar(150) DEFAULT NULL,
  `doc_number` varchar(50) DEFAULT NULL,
  `doc_content` longtext NOT NULL,
  PRIMARY KEY (`doc_id`),
  KEY `documents_doc_type_FK_idx` (`doc_type_id`),
  CONSTRAINT `documents_doc_type_FK` FOREIGN KEY (`doc_type_id`) REFERENCES `document_types` (`doc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.documents: ~12 rows (approximately)
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` (`doc_id`, `doc_type_id`, `doc_name`, `doc_number`, `doc_content`) VALUES
	(2, 1, 'aaa', '222', '{"json":"data1111"}'),
	(3, 1, 'bbb', '333', '333bbb'),
	(4, 1, 'ccc', '444', '444ccc'),
	(5, 2, 'ddd', '555', '555ddd'),
	(6, 2, 'eee', '666', '666eee'),
	(7, 2, 'fff', '777', '777fff'),
	(8, 2, 'ggg', '888', '888ggg'),
	(9, 1, 'hhh', '999', '999hhh'),
	(10, 1, 'iii', '1010', '1010iii'),
	(14, 3, 'jjj', '1010', '1010jjj'),
	(15, 5, 'kkk', '1111', '1111kkk'),
	(16, 3, 'lll', '1212', '1212lll');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;

-- Dumping structure for table dms.document_receiver
CREATE TABLE IF NOT EXISTS `document_receiver` (
  `doc_receiv_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(11) NOT NULL,
  `receiv_user_id` int(11) DEFAULT NULL,
  `receiv_group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`doc_receiv_id`),
  KEY `doc_id_idx` (`doc_id`),
  CONSTRAINT `doc_receiv_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `documents` (`doc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.document_receiver: ~6 rows (approximately)
/*!40000 ALTER TABLE `document_receiver` DISABLE KEYS */;
INSERT INTO `document_receiver` (`doc_receiv_id`, `doc_id`, `receiv_user_id`, `receiv_group_id`) VALUES
	(3, 3, 1, NULL),
	(4, 7, 2, NULL),
	(5, 9, 2, NULL),
	(6, 14, NULL, 1),
	(7, 15, NULL, 2),
	(8, 16, NULL, 3);
/*!40000 ALTER TABLE `document_receiver` ENABLE KEYS */;

-- Dumping structure for table dms.document_status
CREATE TABLE IF NOT EXISTS `document_status` (
  `doc_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `document_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `doc_status_descr` varchar(50) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`doc_status_id`),
  KEY `document_status_documents_FK_idx` (`document_id`),
  KEY `document_status_status_FK_idx` (`status_id`),
  KEY `document_status_user_FK_idx` (`user_id`),
  CONSTRAINT `document_status_documents_FK` FOREIGN KEY (`document_id`) REFERENCES `documents` (`doc_id`),
  CONSTRAINT `document_status_status_FK` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`),
  CONSTRAINT `document_status_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.document_status: ~12 rows (approximately)
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
INSERT INTO `document_status` (`doc_status_id`, `document_id`, `status_id`, `user_id`, `doc_status_descr`, `date`) VALUES
	(1, 2, 1, 2, NULL, '2019-02-21 00:25:26'),
	(2, 3, 2, 1, NULL, '2019-02-21 00:25:26'),
	(3, 4, 3, 2, NULL, '2019-02-21 00:25:26'),
	(4, 5, 4, 1, 'bad mood', '2019-02-21 00:25:26'),
	(5, 6, 1, 2, NULL, '2019-02-21 00:25:26'),
	(6, 7, 2, 1, NULL, '2019-02-21 00:25:26'),
	(7, 8, 3, 2, NULL, '2019-02-21 00:25:26'),
	(9, 9, 2, 1, NULL, '2019-03-13 00:05:34'),
	(10, 9, 3, 1, NULL, '2019-03-14 00:29:07'),
	(12, 14, 2, 2, NULL, '2019-03-17 01:56:21'),
	(13, 15, 2, 2, NULL, '2019-03-17 01:56:21'),
	(14, 16, 2, 1, NULL, '2019-03-17 17:30:19');
/*!40000 ALTER TABLE `document_status` ENABLE KEYS */;

-- Dumping structure for table dms.document_types
CREATE TABLE IF NOT EXISTS `document_types` (
  `doc_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type_descr` varchar(45) NOT NULL,
  `doc_template` longtext NOT NULL,
  PRIMARY KEY (`doc_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.document_types: ~4 rows (approximately)
/*!40000 ALTER TABLE `document_types` DISABLE KEYS */;
INSERT INTO `document_types` (`doc_type_id`, `doc_type_descr`, `doc_template`) VALUES
	(1, 'Atostogų prašymas', 'fsffdf'),
	(2, 'Prašymas atleisti iš darbo', 'sfasdf'),
	(3, 'Pasiaiškinimas', '222222222'),
	(5, 'Įsakymas', 'įsakau');
/*!40000 ALTER TABLE `document_types` ENABLE KEYS */;

-- Dumping structure for table dms.events
CREATE TABLE IF NOT EXISTS `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(11) DEFAULT NULL,
  `event_type_id` int(11) DEFAULT NULL,
  `event_time` datetime NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `events_doc_id_idx` (`doc_id`),
  KEY `events_event_type_id_idx` (`event_type_id`),
  KEY `events_user_id_idx` (`user_id`),
  CONSTRAINT `events_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `documents` (`doc_id`),
  CONSTRAINT `events_event_type_id` FOREIGN KEY (`event_type_id`) REFERENCES `event_type` (`event_type_id`),
  CONSTRAINT `events_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.events: ~8 rows (approximately)
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` (`event_id`, `doc_id`, `event_type_id`, `event_time`, `user_id`) VALUES
	(2, 2, NULL, '2019-03-12 11:35:58', 1),
	(3, 3, NULL, '2019-03-12 11:35:59', 2),
	(4, 4, NULL, '2019-03-12 11:35:59', 1),
	(5, 5, NULL, '2019-03-12 11:35:59', 2),
	(6, 6, NULL, '2019-03-12 11:35:59', 2),
	(7, 7, NULL, '2019-03-12 11:35:59', 2),
	(8, 8, NULL, '2019-03-12 11:35:59', 1),
	(9, 9, NULL, '2019-03-13 00:07:00', 1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;

-- Dumping structure for table dms.event_type
CREATE TABLE IF NOT EXISTS `event_type` (
  `event_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`event_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.event_type: ~7 rows (approximately)
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
INSERT INTO `event_type` (`event_type_id`, `event_descr`) VALUES
	(1, 'registracija'),
	(2, 'prisijungta'),
	(3, 'atsijungta'),
	(4, 'dokumentas sukurtas'),
	(5, 'dokumentas pateiktas'),
	(6, 'dokumentas priimtas'),
	(7, 'dokumentas atmestas');
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;

-- Dumping structure for table dms.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL,
  `deleted` int(1) NOT NULL DEFAULT 0,
  `can_receive_docs` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.groups: ~5 rows (approximately)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`group_id`, `group_name`, `deleted`, `can_receive_docs`) VALUES
	(1, 'administracija', 0, 1),
	(2, 'it skyrius', 0, 1),
	(3, 'vairuotojai', 0, 0),
	(4, 'virejai', 0, 1),
	(5, 'plovejai', 1, 1);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Dumping structure for table dms.group_permissions
CREATE TABLE IF NOT EXISTS `group_permissions` (
  `group_perm_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`group_perm_id`),
  KEY `grpup_permissions_group_FK_idx` (`group_id`),
  KEY `group_permissions_permission_id_idx` (`permission_id`),
  CONSTRAINT `group_permissions_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  CONSTRAINT `grpup_permissions_group_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dms.group_permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_permissions` ENABLE KEYS */;

-- Dumping structure for table dms.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_descr` varchar(50) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dms.permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

-- Dumping structure for table dms.receivers
CREATE TABLE IF NOT EXISTS `receivers` (
  `receiver_id` int(11) NOT NULL AUTO_INCREMENT,
  `receiv_user_id` int(11) DEFAULT NULL,
  `receiv_group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`receiver_id`),
  KEY `receiv_user_idx` (`receiv_user_id`),
  KEY `receiv_group_idx` (`receiv_group_id`),
  CONSTRAINT `receiv_group` FOREIGN KEY (`receiv_group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `receiv_user` FOREIGN KEY (`receiv_user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.receivers: ~5 rows (approximately)
/*!40000 ALTER TABLE `receivers` DISABLE KEYS */;
INSERT INTO `receivers` (`receiver_id`, `receiv_user_id`, `receiv_group_id`) VALUES
	(1, 2, NULL),
	(2, NULL, 3),
	(3, NULL, 1),
	(4, 1, NULL),
	(5, NULL, 2);
/*!40000 ALTER TABLE `receivers` ENABLE KEYS */;

-- Dumping structure for table dms.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `can_receive_docs` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.roles: ~3 rows (approximately)
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` (`id`, `name`, `deleted`, `can_receive_docs`) VALUES
	(1, 'manager', 0, 1),
	(2, 'admin', 0, 1),
	(3, 'user', 0, 0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

-- Dumping structure for table dms.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_descr` varchar(50) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.status: ~4 rows (approximately)
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`status_id`, `status_descr`) VALUES
	(1, 'sukurtas'),
	(2, 'pateiktas'),
	(3, 'priimtas'),
	(4, 'atmestas');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;

-- Dumping structure for table dms.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  `deleted` int(11) DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.users: ~13 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `surname`, `password`, `email`, `position`, `deleted`) VALUES
	(3, 'Harold', 'Konstantinopopolis', '$2a$10$.tzSPH1IBxb0mmBWrcEPGOHYXKphyYT/W8gDB9I5yPDYecLY./1nq', 'Hellothere@gmail.com', 'thePassIsGerietis123', 0),
	(4, 'Bianca', 'Popalipopovič', '$2a$10$5tcdbCwHGNg.4dDLUtI8qe7YLTkNkDgYM7JE5rS3zluhfShSQLjza', 'haibois@gmail.com', 'thePassIsGerietis123', 0),
	(5, 'Jackson', 'Aligoronostoc', '$2a$10$c7IjugkjBDb4qKK1s4V98ezNMfynfSDIid8T4iLUh.1Zy6dw5yMVK', 'alfie@gmail.com', 'thePassIsGerietis123', 0),
	(6, 'Kobaltas', 'Deimantinis', '$2a$10$37K59omJZ0.i5qojqDqacu5mdtYSOBd8itbfD/3Yno9QA5lq2hHRq', 'xxxdeimanciuks@gmail.com', 'thePassIsGerietis123', 0),
	(7, 'Jonas', 'Petraitis', '$2a$10$jr2bENnpgs6xp1y5md5J/Oii4ew2aPfuFmsup4x8I29Ajtr/RQ6Ym', 'petrux666@gmail.com', 'thePassIsGerietis123', 0),
	(8, 'kamponemberas', 'Truxtux', '$2a$10$9zHd6o/MAIO7U9H/jclqKe7kilLxvJpT414okj8LB8x.azuSfWPHW', 'topinampas@gmail.com', 'thePassIsGerietis123', 0),
	(9, 'Pilnutinis', 'Kibiraitis', '$2a$10$1BSOxg4XsOlfOQkleGrVleLtaEW6SjK.R2OZB/9t7C14qoixMgS6S', 'kumpis2@gmail.com', 'thePassIsGerietis123', 0),
	(10, 'Kebabinis', 'Topinambas', '$2a$10$NnXddDBGTkgx29LN/sx5fuvfdmoworRGPOSfctpfyLmxLrHU9vDXC', 'algimantuxxx@gmail.com', 'thePassIsGerietis123', 0),
	(11, 'Kebabinis', 'Topinambas', '$2a$10$WA1C6zSIEJXcCiVSdoxSiurDhyAUEelOjUkCguym2X0EitAdycYze', 'hellotherex@gmail.com', 'thePassIsGerietis123', 0),
	(14, 'Sraigtinis', 'Topinambas', '$2a$10$e3zsSnexR2/60hKaDCFXueJaS2wStVrCBk7IhYtpW5LXw.dTsfQNW', 'algimantuxxx@oney.com', 'thePassIsGerietis123', 0),
	(18, 'Elektrinis', 'Mandarinas', '$2a$10$gjcx1yJDlVJgBrqR0qqKuu7jJnIixdvGhuymYvo3gk2Jew2v.2.1u', 'algimantux2@oney.com', 'thePassIsGerietis123', 0),
	(22, 'Tuesday', 'Tester the second', '$2a$10$8QUGSgGPrhbIMsTg4YDfM.btVI8mPRFpT5cq.kSMWkqOIOs84nLyO', 'evengreater@mail.com', 'the pass is Gerietis123', 0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table dms.user_groups
CREATE TABLE IF NOT EXISTS `user_groups` (
  `user_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`),
  KEY `group_FK_idx` (`group_id`),
  KEY `user_groups_user_FK_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.user_groups: ~9 rows (approximately)
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
INSERT INTO `user_groups` (`user_group_id`, `user_id`, `group_id`) VALUES
	(2, 3, 3),
	(3, 2, 2),
	(5, 3, 3),
	(6, 3, 3),
	(7, 3, 3),
	(8, 3, 3),
	(9, 3, 3),
	(10, 3, 3),
	(11, 4, 1);
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;

-- Dumping structure for table dms.user_roles
CREATE TABLE IF NOT EXISTS `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `userRoles_userFK_idx` (`user_id`),
  KEY `userRoles_rolesFK_idx` (`role_id`),
  CONSTRAINT `userRoles_rolesFK` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `userRoles_userFK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- Dumping data for table dms.user_roles: ~11 rows (approximately)
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` (`id`, `user_id`, `role_id`) VALUES
	(1, 3, 3),
	(2, 2, 2),
	(3, 5, 2),
	(4, 3, 2),
	(5, 10, 3),
	(6, 3, 2),
	(7, 9, 2),
	(8, 7, 1),
	(9, 7, 3),
	(10, 22, 3),
	(11, 9, 3);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
