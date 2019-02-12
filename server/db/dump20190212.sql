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


-- Dumping database structure for dvs
CREATE DATABASE IF NOT EXISTS `dvs` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dvs`;

-- Dumping structure for table dvs.documents
CREATE TABLE IF NOT EXISTS `documents` (
  `doc_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type_id` int(11) NOT NULL,
  `doc_name` varchar(150) DEFAULT NULL,
  `doc_number` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `doc_content` longtext NOT NULL,
  `doc_satus_id` int(11) NOT NULL,
  PRIMARY KEY (`doc_id`),
  KEY `documents_doc_type_FK_idx` (`doc_type_id`),
  KEY `documents_user_FK_idx` (`user_id`),
  KEY `documents_doc_status_FK_idx` (`doc_satus_id`),
  CONSTRAINT `documents_doc_status_FK` FOREIGN KEY (`doc_satus_id`) REFERENCES `document_status` (`doc_status_id`),
  CONSTRAINT `documents_doc_type_FK` FOREIGN KEY (`doc_type_id`) REFERENCES `document_types` (`doc_type_id`),
  CONSTRAINT `documents_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.documents: ~0 rows (approximately)
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;

-- Dumping structure for table dvs.document_status
CREATE TABLE IF NOT EXISTS `document_status` (
  `doc_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_status` varchar(50) NOT NULL,
  PRIMARY KEY (`doc_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.document_status: ~0 rows (approximately)
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_status` ENABLE KEYS */;

-- Dumping structure for table dvs.document_types
CREATE TABLE IF NOT EXISTS `document_types` (
  `doc_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`doc_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.document_types: ~0 rows (approximately)
/*!40000 ALTER TABLE `document_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_types` ENABLE KEYS */;

-- Dumping structure for table dvs.events
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.events: ~0 rows (approximately)
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;

-- Dumping structure for table dvs.event_type
CREATE TABLE IF NOT EXISTS `event_type` (
  `event_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`event_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.event_type: ~0 rows (approximately)
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;

-- Dumping structure for table dvs.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.groups: ~0 rows (approximately)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

-- Dumping structure for table dvs.group_permissions
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

-- Dumping data for table dvs.group_permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_permissions` ENABLE KEYS */;

-- Dumping structure for table dvs.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_descr` varchar(50) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.permissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;

-- Dumping structure for table dvs.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `position` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`user_id`, `name`, `surname`, `password`, `email`, `position`) VALUES
	(1, 'Test-user4', 'marius-test', 'wow', 'best@emails.com', 'driver'),
	(2, 'boi', 'bestboi', 'asd', 'izi@email.com', 'pointer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table dvs.user_groups
CREATE TABLE IF NOT EXISTS `user_groups` (
  `user_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`),
  KEY `group_FK_idx` (`group_id`),
  KEY `user_groups_user_FK_idx` (`user_id`),
  CONSTRAINT `user_groups_group_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `user_groups_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table dvs.user_groups: ~0 rows (approximately)
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
