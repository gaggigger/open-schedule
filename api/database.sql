-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: openschedule
-- ------------------------------------------------------
-- Server version	5.7.17-1

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_resources_UN` (`name`),
  KEY `os_resources_name_IDX` (`name`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources`
--

LOCK TABLES `os_resources` WRITE;
/*!40000 ALTER TABLE `os_resources` DISABLE KEYS */;
INSERT INTO `os_resources` VALUES (1,'rooms','{\"icon\": \"glyphicon glyphicon-home\", \"name\": \"Rooms\", \"path\": \"/resources/rooms\"}',1,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"code\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}, {\"name\": \"capacity\", \"type\": \"number\", \"group\": \"Information\", \"label\": \"Capacity\", \"grid_column\": false}, {\"name\": \"picture\", \"type\": \"picture\", \"group\": \"Pictures\", \"label\": \"Picture\"}]'),(3,'students','{\"icon\": \"glyphicon glyphicon-user\", \"name\": \"Students\", \"path\": \"/resources/students\"}',3,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',NULL),(4,'teachers','{\"icon\": \"glyphicon glyphicon-briefcase\", \"name\": \"Enseignants\", \"path\": \"/resources/teachers\"}',4,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',NULL),(5,'groups','{\"icon\": \"glyphicon glyphicon-inbox\", \"name\": \"Groups\", \"path\": \"/resources/groups\"}',5,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',NULL),(6,'promotions','{\"icon\": \"glyphicon glyphicon-education\", \"name\": \"Promotions\", \"path\": \"/resources/promotions\"}',6,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',NULL),(7,'lectures','{\"icon\": \"glyphicon glyphicon-book\", \"name\": \"Lectures\", \"path\": \"/resources/lectures\"}',7,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_create\": [\"ROLE_ADMIN\"]}','[{\"name\": \"color\", \"type\": \"color\", \"group\": \"Information\", \"label\": \"Color\", \"grid_column\": true}, {\"name\": \"code\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Code\", \"length\": \"10\", \"unique\": true, \"mandatory\": true, \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"mandatory\": true, \"grid_column\": true}]'),(8,'staff','{\"icon\": \"glyphicon glyphicon-sunglasses\", \"name\": \"Staff\", \"path\": \"/resources/students\"}',8,'{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}',NULL);
/*!40000 ALTER TABLE `os_resources` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `os_resources_features_resources_name_IDX` (`resources_name`) USING HASH,
  CONSTRAINT `os_resources_features_os_resources_FK` FOREIGN KEY (`resources_name`) REFERENCES `os_resources` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources_features`
--

LOCK TABLES `os_resources_features` WRITE;
/*!40000 ALTER TABLE `os_resources_features` DISABLE KEYS */;
INSERT INTO `os_resources_features` VALUES (1,'rooms',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/rooms/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}'),(2,'rooms',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/rooms/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}'),(3,'rooms',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/rooms/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\"]}'),(4,'lectures',1,'{\"icon\": \"glyphicon glyphicon-info-sign\", \"name\": \"Informations\", \"path\": \"/resources/lectures/features/info\", \"component\": \"app-resource-info\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}'),(5,'lectures',1,'{\"icon\": \"glyphicon glyphicon-calendar\", \"name\": \"Calendar\", \"path\": \"/resources/lectures/features/calendar\", \"component\": \"app-resource-calendar\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}'),(6,'lectures',1,'{\"icon\": \"glyphicon glyphicon-print\", \"name\": \"Print\", \"path\": \"/resources/lectures/features/print\", \"component\": \"app-resource-print\"}','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}');
/*!40000 ALTER TABLE `os_resources_features` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`),
  KEY `os_resources_items_resource_IDX` (`resource`) USING BTREE,
  KEY `os_resources_items_os_users_FK` (`user_id`),
  CONSTRAINT `os_resources_items_os_resources_FK` FOREIGN KEY (`resource`) REFERENCES `os_resources` (`name`) ON UPDATE CASCADE,
  CONSTRAINT `os_resources_items_os_users_FK` FOREIGN KEY (`user_id`) REFERENCES `os_users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources_items`
--

LOCK TABLES `os_resources_items` WRITE;
/*!40000 ALTER TABLE `os_resources_items` DISABLE KEYS */;
INSERT INTO `os_resources_items` VALUES (1,'lectures','{\"code\": \"TEST\", \"name\": \"Qwer\", \"color\": \"#0fecf1\"}','2017-11-11 08:27:49','2017-11-11 08:27:49','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL),(2,'lectures','{\"code\": \"TT\", \"name\": \"TEST\", \"color\": \"#0fecf1\"}','2017-11-11 10:26:35','2017-11-11 10:27:13','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL),(3,'lectures','{\"code\": \"T1\", \"name\": \"TEST\", \"color\": \"#41aeb1\"}','2017-11-11 10:37:08','2017-11-11 11:13:30','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL),(4,'rooms','{\"code\": \"uuss\", \"name\": \"wwdw\", \"capacity\": \"wdwdw\"}','2017-11-11 14:01:51','2017-11-11 14:01:51','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL),(5,'rooms','{\"code\": \"uu\", \"name\": \"Newki\", \"capacity\": \"67\"}','2017-11-11 14:08:15','2017-11-11 14:08:15','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL),(6,'rooms','{\"code\": \"T11\", \"name\": \"Test1\"}','2017-11-11 17:07:57','2017-11-11 17:07:57','{\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"], \"can_write\": [\"ROLE_ADMIN\"]}',NULL);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`api`@`%`*/ /*!50003 TRIGGER openschedule.os_resources_items_insert
BEFORE INSERT
ON openschedule.os_resources_items FOR EACH ROW
BEGIN 
	SET @r = null;
	SELECT os_resources_items_check(NEW.resource, NEW.params, null) INTO @r;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`api`@`%`*/ /*!50003 TRIGGER openschedule.os_resources_items_update
BEFORE UPDATE
ON openschedule.os_resources_items FOR EACH ROW
BEGIN 
	SET @r = null;
	SELECT os_resources_items_check(NEW.resource, NEW.params, NEW.id) INTO @r;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `os_users_username_IDX` (`username`) USING BTREE,
  KEY `os_users_active_IDX` (`active`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_users`
--

LOCK TABLES `os_users` WRITE;
/*!40000 ALTER TABLE `os_users` DISABLE KEYS */;
INSERT INTO `os_users` VALUES (1,'{\"name\": \"Solofo\", \"lastname\": \"Ralitera\"}',1,'2017-11-09 04:29:40','2017-11-09 20:28:17',NULL,'admin','$6$a734ed77a9b58df0$m/IEXn4FYVALZKsdhl8Lx96./NU1Hi4avuSrxRtfo0pNZdG7V5g4vVfKGi4HmHX6ORNSMufyL6uS2geXuiU0z.','[\"ROLE_ADMIN\"]');
/*!40000 ALTER TABLE `os_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`api`@`%`*/ /*!50003 TRIGGER openschedule.os_users_insert
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`api`@`%`*/ /*!50003 TRIGGER openschedule.os_users_update
BEFORE UPDATE
ON openschedule.os_users FOR EACH ROW
BEGIN 
	IF ((NEW.password <=> OLD.password) = 0)  THEN
		SET NEW.password = ENCRYPT(NEW.password, CONCAT('$6$', SHA2(RANDOM_BYTES(64), '256')));  
	END IF;
	SET NEW.date_modified = now(); 
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
CREATE DEFINER=`api`@`%` FUNCTION `os_allowed_creating_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
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
CREATE DEFINER=`api`@`%` FUNCTION `os_allowed_reading_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
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
CREATE DEFINER=`api`@`%` FUNCTION `os_allowed_roles`(roles JSON, search_field VARCHAR(20), jfield VARCHAR(20)) RETURNS text CHARSET utf8
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
CREATE DEFINER=`api`@`%` FUNCTION `os_allowed_writing_roles`(roles JSON, search_field VARCHAR(20)) RETURNS text CHARSET utf8
BEGIN
    return os_allowed_roles(roles, search_field, '$.can_write');
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
CREATE DEFINER=`api`@`%` FUNCTION `os_get_json_roles`(query JSON) RETURNS json
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
CREATE DEFINER=`api`@`%` FUNCTION `os_get_json_string`(query JSON, jkey VARCHAR(20)) RETURNS text CHARSET utf8
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
CREATE DEFINER=`api`@`%` FUNCTION `os_resources_items_check`(data_resource VARCHAR(20), data_param JSON, item_id INT) RETURNS tinyint(1)
BEGIN
	DECLARE j_length SMALLINT UNSIGNED default 0;
	DECLARE i SMALLINT UNSIGNED default 0;
	DECLARE fields_item JSON default '[]';
    DECLARE i_count SMALLINT UNSIGNED DEFAULT 0; 

    /* Get resource fields, they contains constraints */
	DECLARE fields JSON default '[]';	
	SELECT r.fields INTO fields FROM os_resources r WHERE r.name = data_resource;

	/* ... role checked in os_set_items */
	SET j_length = JSON_LENGTH(fields);
	WHILE i < j_length DO
		SET fields_item = JSON_EXTRACT(fields, CONCAT('$[',i,']'));
		SET i = i + 1;
		
		SET @pf_name = CONCAT('$.', JSON_UNQUOTE(fields_item -> '$.name'));
		
		if (fields_item -> '$.mandatory') then
			if (JSON_EXTRACT(data_param, @pf_name) is null OR JSON_EXTRACT(data_param, @pf_name) = '') then
				SIGNAL SQLSTATE '45000'
 				SET MESSAGE_TEXT = 'mandatory_data_not_sent';
			end if;
		end if;
		
		if (fields_item -> '$.unique') then
			/* If updqte : dont check himself */
			if (item_id) then
				SELECT count(*) INTO i_count  
					FROM os_resources_items oi
					WHERE oi.resource = resource
					AND JSON_EXTRACT(oi.params, @pf_name) = JSON_EXTRACT(data_param, @pf_name)
					AND oi.id <> item_id;
			else
				SELECT count(*) INTO i_count  
					FROM os_resources_items oi
					WHERE oi.resource = resource
					AND JSON_EXTRACT(oi.params, @pf_name) = JSON_EXTRACT(data_param, @pf_name);
			end if;
			
			if i_count > 0 then
				SIGNAL SQLSTATE '45000'
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
CREATE DEFINER=`api`@`%` PROCEDURE `os_get_resources`(query JSON)
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
CREATE DEFINER=`api`@`%` PROCEDURE `os_get_resources_columns`(query JSON)
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
CREATE DEFINER=`api`@`%` PROCEDURE `os_get_resources_data`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	SET roles = os_get_json_roles(query); 
	
	SET @resource = os_get_json_string(query , 'resource');
    
	set @swhere = os_allowed_reading_roles(roles, 'roles');

    set @query = CONCAT(
		'SELECT  JSON_INSERT(params, ''$.id'', id) as data FROM os_resources_items WHERE resource = ?',
		' AND (', @swhere, ' )'
	);
    
    PREPARE stmt FROM @query;
    EXECUTE stmt USING @resource;
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
CREATE DEFINER=`api`@`%` PROCEDURE `os_get_resources_features`(query JSON)
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`api`@`%` PROCEDURE `os_get_user_by_name_password`(query JSON)
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
CREATE DEFINER=`api`@`%` PROCEDURE `os_set_items`(query JSON)
BEGIN
	DECLARE parent_fields JSON default '[]';
	DECLARE parent_fields_item JSON default '[]';
	DECLARE j_length SMALLINT UNSIGNED default 0;
    DECLARE i SMALLINT UNSIGNED DEFAULT 0; 
    DECLARE i_count SMALLINT UNSIGNED DEFAULT 0; 
	DECLARE roles JSON default null;
	DECLARE resource VARCHAR(20) default '';
	DECLARE data JSON default null;
	
	SET roles = os_get_json_roles(query);	
	SET resource = os_get_json_string(query , 'resource');
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
		
		PREPARE stmt FROM 'INSERT INTO os_resources_items (resource, params, roles) values (?, ?, ?)';
		EXECUTE stmt USING @r, @d, @parent_roles;
		
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

-- Dump completed on 2017-11-11 17:39:20
