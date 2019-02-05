CREATE DATABASE  IF NOT EXISTS `DVS` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `DVS`;
-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: DVS
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `document_status`
--

DROP TABLE IF EXISTS `document_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `document_status` (
  `doc_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_status` varchar(50) NOT NULL,
  PRIMARY KEY (`doc_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_status`
--

LOCK TABLES `document_status` WRITE;
/*!40000 ALTER TABLE `document_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document_types`
--

DROP TABLE IF EXISTS `document_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `document_types` (
  `doc_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_type_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`doc_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document_types`
--

LOCK TABLES `document_types` WRITE;
/*!40000 ALTER TABLE `document_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `documents` (
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_type`
--

DROP TABLE IF EXISTS `event_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `event_type` (
  `event_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `event_descr` varchar(45) NOT NULL,
  PRIMARY KEY (`event_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_type`
--

LOCK TABLES `event_type` WRITE;
/*!40000 ALTER TABLE `event_type` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `events` (
  `event_id` int(11) NOT NULL AUTO_INCREMENT,
  `doc_id` int(11) DEFAULT NULL,
  `event_type_id` int(11) DEFAULT NULL,
  `event_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `events_doc_id_idx` (`doc_id`),
  KEY `events_event_type_id_idx` (`event_type_id`),
  KEY `events_user_id_idx` (`user_id`),
  CONSTRAINT `events_doc_id` FOREIGN KEY (`doc_id`) REFERENCES `documents` (`doc_id`),
  CONSTRAINT `events_event_type_id` FOREIGN KEY (`event_type_id`) REFERENCES `event_type` (`event_type_id`),
  CONSTRAINT `events_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_permissions`
--

DROP TABLE IF EXISTS `group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `group_permissions` (
  `group_perm_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`group_perm_id`),
  KEY `grpup_permissions_group_FK_idx` (`group_id`),
  KEY `group_permissions_permission_id_idx` (`permission_id`),
  CONSTRAINT `group_permissions_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`),
  CONSTRAINT `grpup_permissions_group_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_permissions`
--

LOCK TABLES `group_permissions` WRITE;
/*!40000 ALTER TABLE `group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(50) NOT NULL,
  PRIMARY KEY (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `permissions` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_descr` varchar(50) NOT NULL,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `positions`
--

DROP TABLE IF EXISTS `positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `positions` (
  `position_id` int(11) NOT NULL AUTO_INCREMENT,
  `position` varchar(50) NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `positions`
--

LOCK TABLES `positions` WRITE;
/*!40000 ALTER TABLE `positions` DISABLE KEYS */;
/*!40000 ALTER TABLE `positions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_groups`
--

DROP TABLE IF EXISTS `user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_groups` (
  `user_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`user_group_id`),
  KEY `group_FK_idx` (`group_id`),
  KEY `user_groups_user_FK_idx` (`user_id`),
  CONSTRAINT `user_groups_group_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `user_groups_user_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_groups`
--

LOCK TABLES `user_groups` WRITE;
/*!40000 ALTER TABLE `user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `position_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  KEY `position_FK_idx` (`position_id`),
  CONSTRAINT `users_position_FK` FOREIGN KEY (`position_id`) REFERENCES `positions` (`position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-05  9:17:34
