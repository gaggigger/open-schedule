-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: openschedule
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.17.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `os_attachments`
--

DROP TABLE IF EXISTS `os_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_attachments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(100) NOT NULL,
  `params` json DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `content` mediumblob NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sessions_id` int(11) NOT NULL,
  `creator` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_attachments_UN` (`uuid`),
  KEY `os_attachments_uuid_IDX` (`uuid`) USING BTREE,
  KEY `os_attachments_os_sessions_FK` (`sessions_id`),
  KEY `os_attachments_os_users_FK` (`creator`),
  CONSTRAINT `os_attachments_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`),
  CONSTRAINT `os_attachments_os_users_FK` FOREIGN KEY (`creator`) REFERENCES `os_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_attachments`
--

LOCK TABLES `os_attachments` WRITE;
/*!40000 ALTER TABLE `os_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `os_attachments` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_attachments_insert
BEFORE INSERT
ON openschedule.os_attachments FOR EACH ROW
BEGIN

	SET @r = 0;

	SELECT os_check_sessions(NEW.sessions_id, NEW.sessions_id) INTO @r;
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_attachments_update
BEFORE UPDATE
ON openschedule.os_attachments FOR EACH ROW
BEGIN

	SET @r = 0;

	SELECT os_check_sessions(NEW.sessions_id, OLD.sessions_id) INTO @r;
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_attachments_delete
BEFORE DELETE
ON openschedule.os_attachments FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(OLD.sessions_id, OLD.sessions_id) INTO @r;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_choicelists`
--

DROP TABLE IF EXISTS `os_choicelists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_choicelists` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `params` json DEFAULT NULL,
  `sessions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_choicelists_UN` (`name`),
  KEY `os_choicelists_os_sessions_FK` (`sessions_id`),
  CONSTRAINT `os_choicelists_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_choicelists`
--

LOCK TABLES `os_choicelists` WRITE;
/*!40000 ALTER TABLE `os_choicelists` DISABLE KEYS */;
INSERT INTO `os_choicelists` VALUES (1,'GRADE','[{\"code\": \"LCN\", \"label\": \"Licence\"}, {\"code\": \"MTR\", \"label\": \"Maîtrise\"}, {\"code\": \"MSR\", \"label\": \"Master\"}, {\"code\": \"DEA\", \"label\": \"DEA\"}, {\"code\": \"AEA\", \"label\": \"AEA\"}, {\"code\": \"ING\", \"label\": \"Ingéniorat\"}, {\"code\": \"DTR\", \"label\": \"Doctorat\"}, {\"code\": \"PFR\", \"label\": \"Professorat\"}, {\"code\": \"PFRT\", \"label\": \"Professeur Titulaire\"}]',1);
/*!40000 ALTER TABLE `os_choicelists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_resources`
--

DROP TABLE IF EXISTS `os_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_resources` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `params` json DEFAULT NULL,
  `position` tinyint(4) DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `fields` json DEFAULT NULL,
  `sessions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_resources_UN` (`name`,`sessions_id`),
  KEY `os_resources_name_IDX` (`name`) USING HASH,
  KEY `os_resources_os_sessions_FK` (`sessions_id`),
  CONSTRAINT `os_resources_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources`
--

LOCK TABLES `os_resources` WRITE;
/*!40000 ALTER TABLE `os_resources` DISABLE KEYS */;
INSERT INTO `os_resources` VALUES (1,'rooms','{\"icon\": \"glyphicon glyphicon-home\", \"name\": \"Rooms\", \"path\": \"/resources/rooms\"}',1,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"code\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"capacity\", \"type\": \"number\", \"group\": \"Information\", \"label\": \"Capacity\", \"grid_column\": false}, {\"name\": \"picture\", \"type\": \"picture\", \"group\": \"Pictures\", \"label\": \"Picture\"}]',1),(3,'students','{\"icon\": \"glyphicon glyphicon-user\", \"name\": \"Students\", \"path\": \"/resources/students\"}',3,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"matricule\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"lastname\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Lastname\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"birth\", \"type\": \"date\", \"group\": \"Information\", \"label\": \"Birth date\", \"mandatory\": true, \"grid_column\": false}, {\"name\": \"email\", \"type\": \"email\", \"group\": \"Information\", \"label\": \"Mail\", \"unique\": true, \"mandatory\": true, \"grid_column\": false}, {\"name\": \"father_name\", \"type\": \"text\", \"group\": \"Parents\", \"label\": \"Father\"}, {\"name\": \"mother_name\", \"type\": \"text\", \"group\": \"Parents\", \"label\": \"Mother\"}, {\"name\": \"promotions\", \"type\": \"resources_items\", \"group\": \"Promotions\", \"label\": \"Promotions\", \"resources_items_items\": [\"promotions\"]}]',1),(4,'teachers','{\"icon\": \"glyphicon glyphicon-briefcase\", \"name\": \"Enseignants\", \"path\": \"/resources/teachers\"}',4,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"matricule\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"lastname\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Lastname\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"grade\", \"type\": \"choicelist\", \"group\": \"Autres\", \"label\": \"Grade\", \"choicelist_item\": \"GRADE\"}, {\"name\": \"email\", \"type\": \"email\", \"group\": \"Information\", \"label\": \"Mail\", \"unique\": true, \"mandatory\": true, \"grid_column\": false}, {\"name\": \"hourly_rate\", \"type\": \"number\", \"group\": \"Autres\", \"label\": \"Taux horaire\"}]',1),(5,'groups','{\"icon\": \"glyphicon glyphicon-inbox\", \"name\": \"Groups\", \"path\": \"/resources/groups\"}',5,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"groupid\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}]',1),(6,'promotions','{\"icon\": \"glyphicon glyphicon-education\", \"name\": \"Promotions\", \"path\": \"/resources/promotions\"}',6,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"classid\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}]',1),(7,'lectures','{\"icon\": \"glyphicon glyphicon-book\", \"name\": \"Lectures\", \"path\": \"/resources/lectures\"}',7,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"color\", \"type\": \"color\", \"group\": \"Information\", \"label\": \"Color\", \"grid_column\": true}, {\"name\": \"code\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Code\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}]',1),(8,'staff','{\"icon\": \"glyphicon glyphicon-sunglasses\", \"name\": \"Staff\", \"path\": \"/resources/students\"}',8,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"matricule\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"lastname\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Lastname\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"grade\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Grate (TODO)\", \"grid_column\": false}, {\"name\": \"email\", \"type\": \"email\", \"group\": \"Information\", \"label\": \"Mail\", \"unique\": true, \"mandatory\": true, \"grid_column\": false}, {\"name\": \"hourly_rate\", \"type\": \"number\", \"label\": \"Taux horaire\", \"Information\": \"Parents\"}]',1);
/*!40000 ALTER TABLE `os_resources` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_insert
BEFORE INSERT
ON openschedule.os_resources FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, NEW.sessions_id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_update
BEFORE UPDATE
ON openschedule.os_resources FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, OLD.sessions_id) INTO @r;
	
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_delete
BEFORE DELETE
ON openschedule.os_resources FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(OLD.sessions_id, OLD.sessions_id) INTO @r;
	
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_resources_features`
--

DROP TABLE IF EXISTS `os_resources_features`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_resources_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resources_name` varchar(20) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `params` json DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `sessions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `os_resources_features_resources_name_IDX` (`resources_name`) USING HASH,
  KEY `os_resources_features_os_sessions_FK` (`sessions_id`),
  CONSTRAINT `os_resources_features_os_resources_FK` FOREIGN KEY (`resources_name`) REFERENCES `os_resources` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `os_resources_features_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources_features`
--

LOCK TABLES `os_resources_features` WRITE;
/*!40000 ALTER TABLE `os_resources_features` DISABLE KEYS */;
INSERT INTO `os_resources_features` VALUES (1,'rooms',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/rooms/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(2,'rooms',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/rooms/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(3,'rooms',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/rooms/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\"]}',1),(4,'lectures',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/lectures/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(5,'lectures',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/lectures/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(6,'lectures',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/lectures/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(7,'students',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/students/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(8,'students',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/students/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(9,'students',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/lectures/students/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(10,'teachers',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/teachers/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(11,'teachers',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/teachers/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(12,'teachers',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/teachers/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(13,'groups',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/groups/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(14,'groups',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/groups/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(15,'groups',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/groups/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(16,'promotions',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/promotions/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(17,'promotions',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/promotions/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(18,'promotions',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/promotions/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(19,'staff',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/staff/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(20,'staff',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/staff/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1),(21,'staff',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/staff/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',1);
/*!40000 ALTER TABLE `os_resources_features` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_features_insert
BEFORE INSERT
ON openschedule.os_resources_features FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, NEW.sessions_id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_features_update
BEFORE UPDATE
ON openschedule.os_resources_features FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, OLD.sessions_id) INTO @r;
	
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_features_delete
BEFORE DELETE
ON openschedule.os_resources_features FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(OLD.sessions_id, OLD.sessions_id) INTO @r;
	
	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_resources_items`
--

DROP TABLE IF EXISTS `os_resources_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_resources_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource` varchar(20) NOT NULL,
  `params` json DEFAULT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roles` json DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `sessions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `os_resources_items_resource_IDX` (`resource`) USING BTREE,
  KEY `os_resources_items_os_users_FK` (`user_id`),
  KEY `os_resources_items_os_sessions_FK` (`sessions_id`),
  CONSTRAINT `os_resources_items_os_resources_FK` FOREIGN KEY (`resource`) REFERENCES `os_resources` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `os_resources_items_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources_items`
--

LOCK TABLES `os_resources_items` WRITE;
/*!40000 ALTER TABLE `os_resources_items` DISABLE KEYS */;
INSERT INTO `os_resources_items` VALUES (1,'students','{\"name\": \"Ralitera\", \"birth\": \"1983-12-22T00:00:00.000Z\", \"email\": \"solofo.ralitera@gmail.com\", \"lastname\": \"Solofo\", \"matricule\": \"007\", \"promotions\": [5, 6, 5, 6, 5, 6, 7, 6, 6, 6]}','2017-11-11 23:31:45','2017-11-11 23:31:45','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',32,1),(2,'students','{\"name\": \"aeaeazea\", \"birth\": null, \"email\": \"azeaeaz@gmqil.com\", \"lastname\": \"zeaze\", \"matricule\": \"TEST\", \"promotions\": [6, 7, 6, 7]}','2017-11-12 10:43:02','2017-11-12 10:43:02','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',35,1),(3,'lectures','{\"code\": \"Test\", \"name\": \"test\", \"color\": \"#ff0366\"}','2017-11-14 22:18:14','2017-11-14 22:18:14','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(4,'rooms','{\"code\": \"S1\", \"name\": \"Salle 1\", \"picture\": [null, null, \"c06295a6-d070-11e7-9088-1866da0d8409\", \"c1c0fc49-d070-11e7-9088-1866da0d8409\", \"c3149e47-d070-11e7-9088-1866da0d8409\"], \"capacity\": \"50\"}','2017-11-15 21:24:31','2017-11-15 21:24:31','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(5,'promotions','{\"name\": \"testset\", \"classid\": \"Test\"}','2017-11-16 21:55:43','2017-11-16 21:55:43','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(6,'promotions','{\"name\": \"Prom1\", \"classid\": \"P1\"}','2017-11-17 09:10:42','2017-11-17 09:10:42','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(7,'promotions','{\"name\": \"Prom 2\", \"classid\": \"P2\"}','2017-11-17 09:10:57','2017-11-17 09:10:57','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(8,'students','{\"name\": \"Kalao\", \"birth\": \"2017-11-04\", \"email\": \"qeqeqwe\", \"lastname\": \"Test\", \"matricule\": \"Kouakou\", \"promotions\": [6], \"father_name\": \"asdasdada\", \"mother_name\": \"sdasdasd\"}','2017-11-19 11:23:47','2017-11-19 11:23:47','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',36,1),(9,'students','{\"name\": \"asdasd\", \"birth\": \"2017-11-09T00:00:00.000Z\", \"email\": \"adasdasdd@qweqwe:con\", \"lastname\": \"asdasdasda\", \"matricule\": \"Tes\", \"promotions\": [5], \"father_name\": \"dasdasdasd\", \"mother_name\": \"asdasdasd\"}','2017-11-19 11:36:17','2017-11-19 11:36:17','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',38,1),(10,'students','{\"name\": \"New *\", \"birth\": \"2017-11-12\", \"email\": \"asdadasd@asdasd.com\", \"lastname\": \"dasdasdasd\", \"matricule\": \"TesT!\"}','2017-11-19 11:38:54','2017-11-19 11:38:54','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',39,1),(11,'rooms','{\"code\": \"Mini\", \"name\": \"Mini\", \"picture\": [\"f0cfa21e-cee3-11e7-836e-1866da0d8409\"], \"capacity\": \"10\"}','2017-11-21 20:46:47','2017-11-21 20:46:47','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL,1),(12,'teachers','{\"name\": \"Rabe\", \"email\": \"rabe@gmail.com\", \"lastname\": \"Noro\", \"matricule\": \"001\"}','2017-11-23 21:05:01','2017-11-23 21:05:01','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',40,1);
/*!40000 ALTER TABLE `os_resources_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_items_insert
BEFORE INSERT
ON openschedule.os_resources_items FOR EACH ROW
BEGIN 
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, NEW.sessions_id) INTO @r;
	
	SET @r = null;
	
	SELECT os_resources_items_check(NEW.resource, NEW.params, null) INTO @r;
	
	SET @u_name = null;
	if NEW.params->'$.email' is not null THEN
		SET @u_name = JSON_UNQUOTE(NEW.params->'$.email');
	elseif NEW.params->'$.mail' is not null THEN
		SET @u_name = JSON_UNQUOTE(NEW.params->'$.mail');
	end if;
	
	if @u_name is not null THEN	
		
		SET @user_id = null;
		SET @user_roles = null;
		SELECT u.id, u.roles INTO @user_id, @user_roles FROM os_users u WHERE u.username = @u_name;
		
		if @user_id is null THEN		
			SET @password = LEFT(UUID(), 8);
			SET @roles = CONCAT('["ROLE_USER","ROLE_', UPPER(NEW.resource) ,'"]');
			INSERT INTO os_users (params, active, username, password, roles) VALUES ('{}', 0, @u_name, @password, @roles);
			SET @user_id = last_insert_id();
			
			SET @token = null;
			SELECT SHA2(RANDOM_BYTES(64), '256') into @token;
			INSERT INTO os_users_pending (user_id, email, password, token) VALUES (@user_id, @u_name, @password, @token);
			
		else
			SET @user_roles = JSON_INSERT(@user_roles, '$', CONCAT('ROLE_', UPPER(NEW.resource)));
			UPDATE os_users SET roles = @user_roles WHERE id = @user_id;
		end if;
		
		SET NEW.user_id = @user_id;
		
	end if;	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_items_update
BEFORE UPDATE
ON openschedule.os_resources_items FOR EACH ROW
BEGIN 
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, OLD.sessions_id) INTO @r;
	
	SET @r = null;
	SELECT os_resources_items_check(NEW.resource, NEW.params, NEW.id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_resources_items_delete
BEFORE DELETE
ON openschedule.os_resources_items FOR EACH ROW
BEGIN 
	SET @r = 0;
	SELECT os_check_sessions(OLD.sessions_id, OLD.sessions_id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_roles`
--

DROP TABLE IF EXISTS `os_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `params` json DEFAULT NULL,
  `sessions_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_roles_UN` (`name`,`sessions_id`),
  KEY `os_roles_os_sessions_FK` (`sessions_id`),
  CONSTRAINT `os_roles_os_sessions_FK` FOREIGN KEY (`sessions_id`) REFERENCES `os_sessions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_roles`
--

LOCK TABLES `os_roles` WRITE;
/*!40000 ALTER TABLE `os_roles` DISABLE KEYS */;
INSERT INTO `os_roles` VALUES (1,'ROLE_ADMIN','{}',1),(2,'ROLE_STUDENTS',NULL,1),(3,'ROLE_SP','{\"name\": \"Secrétariat Pédagogique\"}',1),(4,'ROLE_TEACHERS',NULL,1);
/*!40000 ALTER TABLE `os_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_roles_insert
BEFORE INSERT
ON openschedule.os_roles FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, NEW.sessions_id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_roles_update
BEFORE UPDATE
ON openschedule.os_roles FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(NEW.sessions_id, OLD.sessions_id) INTO @r;

	IF OLD.name = 'ROLE_ADMIN' AND NEW.name <> 'ROLE_ADMIN' THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'readonly_role_name';	
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_roles_delete
BEFORE DELETE
ON openschedule.os_roles FOR EACH ROW
BEGIN
	SET @r = 0;
	SELECT os_check_sessions(OLD.sessions_id, OLD.sessions_id) INTO @r;
	
	IF OLD.name = 'ROLE_ADMIN' THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'undeletable_role';	
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_sessions`
--

DROP TABLE IF EXISTS `os_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_start` date NOT NULL,
  `date_end` date NOT NULL,
  `params` json DEFAULT NULL,
  `closed` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_sessions`
--

LOCK TABLES `os_sessions` WRITE;
/*!40000 ALTER TABLE `os_sessions` DISABLE KEYS */;
INSERT INTO `os_sessions` VALUES (1,'2017-11-06','2018-11-06',NULL,0,'College year 2017-2018');
/*!40000 ALTER TABLE `os_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `os_users`
--

DROP TABLE IF EXISTS `os_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `params` json DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_connection` datetime DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `os_users_username_IDX` (`username`) USING BTREE,
  KEY `os_users_active_IDX` (`active`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_users`
--

LOCK TABLES `os_users` WRITE;
/*!40000 ALTER TABLE `os_users` DISABLE KEYS */;
INSERT INTO `os_users` VALUES (32,'{}',1,'2017-11-11 23:31:45','2017-11-23 20:05:08','2017-11-23 20:05:08','admin','$6$588410667ce1594c$IioWjBw9XINk3t2JV/vgkZHQjf02x/CSbOIbIIfpCJfIk3Qhn8wtV0abrIZHSZQz4eTeGwerND/51oeomZ6FY/','[\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_STUDENTS\"]'),(35,'{}',0,'2017-11-12 10:43:02','2017-11-12 10:43:02',NULL,'azeaeaz@gmqil.com','$6$d981633f3a1a864a$SX2tQTG0zXnwVgB/v0jFFaqnuGcYXex1ZiBh3UU7ERwHtOcB3UsJrIRsAjZi1rWJFG6LZmh3QT86BoxCGYHC61','[\"ROLE_USER\", \"ROLE_STUDENTS\"]'),(36,'{}',0,'2017-11-19 11:23:47','2017-11-19 11:23:47',NULL,'qeqeqwe','$6$78402a3da62501c4$0FB7JavJingUzR4CBSxkTML7t9HxKkmXjpQsbDEhIkPWWCebnS/6P0Svwn8mz4OtHZeOs3fyQ24EOUEqg3syB1','[\"ROLE_USER\", \"ROLE_STUDENTS\"]'),(38,'{}',0,'2017-11-19 11:36:17','2017-11-19 11:36:17',NULL,'adasdasdd@qweqwe:con','$6$2871235526dde90b$dORDPIFnqizTUcBKt/4xZqeHz66DOIMn/dTbQYU9exsFPmzl27nxbekAf5HxoTuHa.cy8eljFaux5yI37XQJw1','[\"ROLE_USER\", \"ROLE_STUDENTS\"]'),(39,'{}',0,'2017-11-19 11:38:54','2017-11-19 11:38:54',NULL,'asdadasd@asdasd.com','$6$ccd09c4ed282d303$JN7lYOG9mv5xlmGTLJRCekjUNXVZHD/.ZVpaOcJsVgm4uZJ/o.oeXUyJDT06twgnzr1ln24ueaJkq/9gflRtf1','[\"ROLE_USER\", \"ROLE_STUDENTS\"]'),(40,'{}',0,'2017-11-23 21:05:01','2017-11-23 21:05:01',NULL,'rabe@gmail.com','$6$a4316f8eb8c7c4cb$2hKz15r5XlnEW9xGI0xxQ2QkdOPCfs54eFSBZJY0mIAOB.cS4A25jJnTMdK2w3x1703ce9DsWxrMCW9BMhfi9/','[\"ROLE_USER\", \"ROLE_TEACHERS\"]');
/*!40000 ALTER TABLE `os_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_users_insert
BEFORE INSERT
ON openschedule.os_users FOR EACH ROW
BEGIN 
	SET NEW.password = ENCRYPT(NEW.password, CONCAT('$6$', SHA2(RANDOM_BYTES(64), '256'))); 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_users_update
BEFORE UPDATE
ON openschedule.os_users FOR EACH ROW
BEGIN 
	IF ((NEW.password <=> OLD.password) = 0)  THEN
		SET NEW.password = ENCRYPT(NEW.password, CONCAT('$6$', SHA2(RANDOM_BYTES(64), '256')));  
	END IF;
	SET NEW.date_modified = now(); 
	
	
	IF ((NEW.roles <=> OLD.roles) = 0)  THEN
		SET @admin_count = null;
		SELECT count(*) into @admin_count FROM os_users WHERE JSON_CONTAINS(roles, '["ROLE_ADMIN"]') AND id <> NEW.id;
		IF @admin_count < 1 THEN
			SIGNAL SQLSTATE '40000'
			SET MESSAGE_TEXT = 'no_more_admin';	 	
		END IF;	
	END IF;	
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_users_delete
BEFORE DELETE
ON openschedule.os_users FOR EACH ROW
BEGIN 
	
	SET @admin_count = null;
	SELECT count(*) into @admin_count FROM os_users WHERE JSON_CONTAINS(roles, '["ROLE_ADMIN"]') AND id <> OLD.id;
	IF @admin_count < 1 THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'no_more_admin';	 	
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `os_users_pending`
--

DROP TABLE IF EXISTS `os_users_pending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_users_pending` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `date_insert` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `email_sent` smallint(6) NOT NULL DEFAULT '0',
  `date_email` datetime DEFAULT NULL,
  UNIQUE KEY `os_users_pending_UN` (`email`),
  KEY `os_users_pending_os_users_FK` (`user_id`),
  CONSTRAINT `os_users_pending_os_users_FK` FOREIGN KEY (`user_id`) REFERENCES `os_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_users_pending`
--

LOCK TABLES `os_users_pending` WRITE;
/*!40000 ALTER TABLE `os_users_pending` DISABLE KEYS */;
INSERT INTO `os_users_pending` VALUES (38,'adasdasdd@qweqwe:con','2017-11-19 11:36:17','b5bc2e63','90380de22428ae7ee31c8f3174ab26186aa84f2a0d7b2a683882867592ed78d4',0,NULL),(39,'asdadasd@asdasd.com','2017-11-19 11:38:54','1354f7d6','ade485fe69afcb75ac4ffa3067031e86cdbef91091af47e368809f2217bf2370',0,NULL),(35,'azeaeaz@gmqil.com','2017-11-12 10:43:02','1c791c4e','b4bb9b7cf5191abed5aa24b2564ff135fcac9042ec1c66a8bee273f75b25fdcb',0,NULL),(36,'qeqeqwe','2017-11-19 11:23:47','f713dbec','e35c8d56862cbc0f5b205f840342840ef5abf3df9a027897c4d5abaf443adc01',0,NULL),(40,'rabe@gmail.com','2017-11-23 21:05:01','d31e18ce','6977d145d111ad0b2933ad655b70f1d9e91f3e4aaff30162bfbfc48b8405dad5',0,NULL);
/*!40000 ALTER TABLE `os_users_pending` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.os_user_pending_before_insert
BEFORE INSERT
ON openschedule.os_users_pending FOR EACH ROW
BEGIN
	if not os_check_email(NEW.email) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'invalid_email';
	end if; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.s_user_pending_before_update
BEFORE UPDATE
ON openschedule.os_users_pending FOR EACH ROW
BEGIN
	if not os_check_email(NEW.email) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'invalid_email';
	end if; 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 */ /*!50003 TRIGGER openschedule.s_user_pending_before_delete
BEFORE DELETE
ON openschedule.os_users_pending FOR EACH ROW
BEGIN 
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Dumping routines for database 'openschedule'
--
/*!50003 DROP FUNCTION IF EXISTS `os_allowed_creating_roles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_allowed_creating_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
BEGIN
    return os_allowed_roles(roles, search_field, '$.can_create');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_allowed_reading_roles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_allowed_reading_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
    DETERMINISTIC
BEGIN
    return os_allowed_roles(roles, search_field, '$.can_read');
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_allowed_roles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_allowed_roles`(roles JSON, search_field VARCHAR(20), jfield VARCHAR(20)) RETURNS text CHARSET utf8
    DETERMINISTIC
BEGIN
    DECLARE j_length SMALLINT UNSIGNED DEFAULT JSON_LENGTH(roles); 
    DECLARE i SMALLINT UNSIGNED DEFAULT 0; 
	set @query = '';
	
	WHILE i < j_length DO
		
		set @query = CONCAT(
			@query,
			'JSON_CONTAINS(', search_field, ' -> ''', jfield ,''', ',
			'''[',
					REPLACE(
						JSON_EXTRACT(roles, CONCAT('$[',i,']')),
						"'", ""
					) ,
			  ']''',
			 ')', ' OR ');
		set i = i + 1;
	END WHILE;
	
	set @query = CONCAT(
		'( ',
			@query,
			' 1=2 ', 
		' )'
	);
	
 	RETURN (@query);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_allowed_writing_roles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_allowed_writing_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
BEGIN
    return os_allowed_roles(roles, search_field, '$.can_write');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_check_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_check_email`(email VARCHAR(255)) RETURNS tinyint(1)
BEGIN
	IF NOT (SELECT email REGEXP '^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$') THEN
		RETURN 0;
    END IF;
	RETURN 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_check_sessions` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_check_sessions`(new_session INT, old_session INT) RETURNS tinyint(1)
BEGIN
	if new_session IS NULL THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'session_period_mandatory';
		return false;
	end if;
	
	if new_session <> old_session THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'session_period_readonly';
		return false;
	end if;

	SET @r = 0;
	SELECT count(*) into @r FROM os_sessions WHERE id = new_session AND closed = 0;
	if @r = 0 THEN
		SIGNAL SQLSTATE '40000'
		SET MESSAGE_TEXT = 'session_period_closed';
		return false;
	end if;
	return true;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_get_json_roles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_get_json_roles`(query JSON) RETURNS json
BEGIN
	DECLARE roles JSON default '[]';
	DECLARE user_id INT default 0;
	
	SET roles = query -> '$.roles'; 
    if (roles is null) then
    	
    	SET user_id = JSON_UNQUOTE(query -> '$.user');
		SELECT u.roles INTO roles FROM os_users u WHERE u.active = 1 AND u.id = user_id;
    end if; 
    
	if (roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_roles_provided';
    end if;
    
    return roles;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_get_json_string` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_get_json_string`(query JSON, jkey VARCHAR(20)) RETURNS text CHARSET utf8
BEGIN
	SET @k = concat('$.', jkey);
	SET @resource = REPLACE(
		JSON_UNQUOTE(JSON_EXTRACT(query, @k)),
		"'",
		""
	);
    if (@resource is null) then
    	SET @message = concat('no_', @k, '_provided');
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = @message;
    end if;
	return @resource;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `os_resources_items_check` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  FUNCTION `os_resources_items_check`(data_resource VARCHAR(20), data_param JSON, item_id INT) RETURNS tinyint(1)
BEGIN
	DECLARE j_length SMALLINT UNSIGNED default 0;
	DECLARE i SMALLINT UNSIGNED default 0;
	DECLARE fields_item JSON default '[]';
    DECLARE i_count SMALLINT UNSIGNED DEFAULT 0; 

    
	DECLARE fields JSON default '[]';	
	SELECT r.fields INTO fields FROM os_resources r WHERE r.name = data_resource;

	
	SET j_length = JSON_LENGTH(fields);
	WHILE i < j_length DO
		SET fields_item = JSON_EXTRACT(fields, CONCAT('$[',i,']'));
		SET i = i + 1;
		
		SET @pf_name = CONCAT('$.', JSON_UNQUOTE(fields_item -> '$.name'));
		
		if (fields_item -> '$.mandatory') then
			if (JSON_EXTRACT(data_param, @pf_name) is null OR JSON_EXTRACT(data_param, @pf_name) = '') then
				SIGNAL SQLSTATE '40000'
 				SET MESSAGE_TEXT = 'mandatory_data_not_sent';
			end if;
		end if;
		
		if (fields_item -> '$.unique') then			
			if (item_id) then
				SELECT count(*) INTO i_count  
					FROM os_resources_items oi
					WHERE oi.resource = resource
					AND LOWER(JSON_EXTRACT(oi.params, @pf_name)) = LOWER(JSON_EXTRACT(data_param, @pf_name))
					AND oi.id <> item_id;
			else
				SELECT count(*) INTO i_count  
					FROM os_resources_items oi
					WHERE oi.resource = resource
					AND JSON_EXTRACT(oi.params, @pf_name) = JSON_EXTRACT(data_param, @pf_name);
			end if;
			
			if i_count > 0 then
				SIGNAL SQLSTATE '40000'
 				SET MESSAGE_TEXT = 'duplicated_value';
			end if;
		end if;
		
	END WHILE;
	return true;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_attachments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_attachments`(query JSON)
BEGIN
	DECLARE uuid VARCHAR(100) DEFAULT '';
	SET uuid = os_get_json_string(query , 'uuid');

	SELECT content FROM os_attachments a WHERE a.uuid = uuid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_resources` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_resources`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	SET roles = os_get_json_roles(query); 
    
	set @swhere = os_allowed_reading_roles(roles, 'roles');
	set @query = CONCAT(
		'SELECT * FROM os_resources WHERE ',
		' (', @swhere, ' )',
		' ORDER by position '
	);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_resources_columns` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_resources_columns`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	SET roles = os_get_json_roles(query); 
	
	SET @resource = os_get_json_string(query, 'resource');
    
    set @query = CONCAT(
		'SELECT fields as columns FROM os_resources WHERE name = ?',
		' AND (', os_allowed_reading_roles(roles, 'roles'), ' )'
	);	

    PREPARE stmt FROM @query;
    EXECUTE stmt USING @resource;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_resources_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_resources_data`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	SET roles = os_get_json_roles(query); 
	set @swhere = os_allowed_reading_roles(roles, 'roles');
	
	IF JSON_EXTRACT(query, '$.resource') is not null THEN
		SET @queryparam = os_get_json_string(query , 'resource');
	    set @query = CONCAT(
			'SELECT  JSON_INSERT(params, ''$.id'', id) as data FROM os_resources_items WHERE ',
			' resource = ? ',
			' AND (', @swhere, ' )'
		);
	    PREPARE stmt FROM @query;
	    EXECUTE stmt USING @queryparam;
    
	ELSEIF JSON_EXTRACT(query, '$.ids')  is not null THEN
		set @queryparam = os_get_json_string(query , 'ids');
	    set @query = CONCAT(
			'SELECT  JSON_INSERT(params, ''$.id'', id) as data FROM os_resources_items WHERE ',
			' JSON_CONTAINS(?,  JSON_ARRAY(CONVERT(id, char)) ) = 1 ',
			' AND (', @swhere, ' )'
		);
	    PREPARE stmt FROM @query;
	    EXECUTE stmt USING @queryparam;
		
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_resources_features` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_resources_features`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	SET roles = os_get_json_roles(query); 
	
	SET @resource = os_get_json_string(query, 'resource');
    
    set @query = CONCAT(
		'SELECT * FROM os_resources_features WHERE resources_name = ? AND active = 1',
		' AND (', os_allowed_reading_roles(roles, 'roles'), ' )'
	);	

    PREPARE stmt FROM @query;
    EXECUTE stmt USING @resource;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_get_user_by_name_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_user_by_name_password`(query JSON)
BEGIN

	SET @u = JSON_UNQUOTE(query -> '$.username');
    if (@u is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_username_provided';
    end if; 
    
	SET @p = JSON_UNQUOTE(query -> '$.password');	
    if (@p is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_password_provided';
    end if; 

    PREPARE stmt FROM 'SELECT id,params as attributes,username,roles FROM os_users WHERE username = ? AND password = ENCRYPT(?, password) AND active = 1';
    EXECUTE stmt USING @u, @p;
    
    UPDATE os_users SET last_connection = now() WHERE username = @u;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_set_attachements` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_set_attachements`(query JSON, body MEDIUMBLOB)
BEGIN
	DECLARE user_id INT default null;
	DECLARE sessions INT default 0;
	DECLARE item_id INT default null;
	DECLARE roles JSON default null;
	
	SET roles = os_get_json_roles(query);	
	SET user_id = os_get_json_string(query , 'user_id');
	SET sessions = os_get_json_string(query , 'sessions');
	SET item_id = os_get_json_string(query , 'item_id');
	SET @items_roles = null;
	
	set @query = CONCAT(
		'SELECT roles INTO @items_roles FROM os_resources_items WHERE id = ', QUOTE(item_id) ,' AND ',
		' (', os_allowed_writing_roles(roles, 'roles'), ' )'
	);
	PREPARE stmt FROM @query;
	EXECUTE stmt;
	if (@items_roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_role_allowed';			
	end if;
	
	INSERT INTO os_attachments (content, creator, sessions_id, uuid) VALUES (body, user_id, sessions, uuid());
	SET @lid = last_insert_id();
	SELECT id,uuid FROM os_attachments WHERE id = @lid;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `os_set_items` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_set_items`(query JSON)
BEGIN
	DECLARE parent_fields JSON default '[]';
	DECLARE parent_fields_item JSON default '[]';
	DECLARE j_length SMALLINT UNSIGNED default 0;
    DECLARE i SMALLINT UNSIGNED DEFAULT 0; 
    DECLARE i_count SMALLINT UNSIGNED DEFAULT 0; 
	DECLARE roles JSON default null;
	DECLARE resource VARCHAR(20) default '';
	DECLARE sessions INT default 0;
	DECLARE data JSON default null;
	
	SET roles = os_get_json_roles(query);	
	SET resource = os_get_json_string(query , 'resource');
	SET sessions = os_get_json_string(query , 'sessions');
	SET data = CAST(os_get_json_string(query , 'data') as JSON);
	
	SET @parent_roles = null;
	if (data->'$.id' is null) then
		
		set @query = CONCAT(
			'SELECT roles INTO @parent_roles FROM os_resources WHERE name = ', QUOTE(resource) ,' AND ',
			' (', os_allowed_creating_roles(roles, 'roles'), ' )'
		);
	else
		
		set @query = CONCAT(
			'SELECT roles INTO @parent_roles FROM os_resources_items WHERE id = ', data->'$.id' ,' AND ',
			' (', os_allowed_writing_roles(roles, 'roles'), ' )'
		);
	end if;
	
	PREPARE stmt FROM @query;
	EXECUTE stmt;
	
	
	if (@parent_roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_role_allowed';			
	end if;
	
	
	SELECT fields INTO parent_fields FROM os_resources WHERE name = resource;
    SET j_length = JSON_LENGTH(parent_fields);
	
	SET @d = data;
	
	if (data->'$.id' is null) then
		
		SET @parent_roles = JSON_REMOVE(
			JSON_INSERT(@parent_roles, '$.can_write', JSON_EXTRACT(@parent_roles, '$.can_create')),
			'$.can_create'
		);
		SET @r = resource;
		SET @ss = sessions;
		
		PREPARE stmt FROM 'INSERT INTO os_resources_items (resource, params, roles, sessions_id) values (?, ?, ?, ?)';
		EXECUTE stmt USING @r, @d, @parent_roles, @ss;
		
		SET @lid = last_insert_id();
		SELECT * FROM os_resources_items WHERE id = @lid;
	else
		SET @did = JSON_UNQUOTE(data->'$.id');
		
		SET @d = JSON_REMOVE(@d, '$.id');
		PREPARE stmt FROM 'UPDATE os_resources_items SET params = ? WHERE id = ?';
		EXECUTE stmt USING @d, @did;
		
		SELECT * FROM os_resources_items WHERE id = @did;
	end if;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-23 21:19:20
