-- MySQL dump 10.13  Distrib 5.7.14, for Win32 (AMD64)
--
-- Host: 192.168.88.8    Database: test
-- ------------------------------------------------------
-- Server version	5.7.20

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
-- Table structure for table `os_items`
--

DROP TABLE IF EXISTS `os_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `os_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resource` varchar(20) NOT NULL,
  `params` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `os_items_resource_IDX` (`resource`) USING BTREE,
  CONSTRAINT `os_items_os_resources_FK` FOREIGN KEY (`resource`) REFERENCES `os_resources` (`name`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_items`
--

LOCK TABLES `os_items` WRITE;
/*!40000 ALTER TABLE `os_items` DISABLE KEYS */;
INSERT INTO `os_items` VALUES (1,'rooms','{\"code\": \"S1\", \"name\": \"Salle 1\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_DE\"]}, \"capacity\": \"50\"}'),(2,'rooms','{\"code\": \"S2\", \"name\": \"Salle 2\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_DE\"]}, \"capacity\": \"30\"}');
/*!40000 ALTER TABLE `os_items` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `os_resources_UN` (`name`),
  KEY `os_resources_name_IDX` (`name`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `os_resources`
--

LOCK TABLES `os_resources` WRITE;
/*!40000 ALTER TABLE `os_resources` DISABLE KEYS */;
INSERT INTO `os_resources` VALUES (1,'rooms','{\"icon\": \"glyphicon glyphicon-home\", \"name\": \"Rooms\", \"path\": \"/resources/rooms\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}, \"fields\": [{\"name\": \"code\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Number\", \"length\": \"10\", \"grid_column\": true}, {\"name\": \"name\", \"type\": \"text\", \"group\": \"Information\", \"label\": \"Name\", \"length\": \"100\", \"grid_column\": true}, {\"name\": \"capacity\", \"type\": \"number\", \"group\": \"Information\", \"label\": \"Capacity\", \"grid_column\": false}]}',1),(2,'contents','{\"icon\": \"glyphicon glyphicon-book\", \"name\": \"Contents\", \"path\": \"/resources/contents\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',2),(3,'students','{\"icon\": \"glyphicon glyphicon-user\", \"name\": \"Students\", \"path\": \"/resources/students\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',3),(4,'teachers','{\"icon\": \"glyphicon glyphicon-user\", \"name\": \"Enseignants\", \"path\": \"/resources/teachers\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',4),(5,'groups','{\"icon\": \"glyphicon glyphicon-inbox\", \"name\": \"Groups\", \"path\": \"/resources/groups\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',5),(6,'promotions','{\"icon\": \"glyphicon glyphicon-education\", \"name\": \"Promotions\", \"path\": \"/resources/promotions\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',6),(7,'lectures','{\"icon\": \"glyphicon glyphicon-book\", \"name\": \"Lectures\", \"path\": \"/resources/lectures\", \"roles\": {\"can_read\": [\"ROLE_ADMIN\", \"ROLE_USER\", \"ROLE_DE\"]}}',7);
/*!40000 ALTER TABLE `os_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
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
    DECLARE j_length SMALLINT UNSIGNED DEFAULT JSON_LENGTH(roles); 
    DECLARE i SMALLINT UNSIGNED DEFAULT 0; 
	set @query = '';

	
	WHILE i < j_length DO
		set @query = CONCAT(
			@query,
			'JSON_CONTAINS(', search_field, ' -> ''$.roles.can_read'', ',
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
	SET roles = query -> '$.roles'; 
    if (roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_roles_provided';
    end if; 
	
    
	set @swhere = os_allowed_reading_roles(roles, 'params');
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE  PROCEDURE `os_get_resources_columns`(query JSON)
BEGIN
	DECLARE roles JSON default '[]';
	
	SET roles = query -> '$.roles';
    if (roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_roles_provided';
    end if; 
	
	SET @resource = JSON_UNQUOTE(query -> '$.resource');
    if (@resource is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_resource_provided';
    end if;
    
    PREPARE stmt FROM 'SELECT JSON_EXTRACT(params, ''$.fields'') as columns FROM os_resources WHERE name = ?';
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
	
	SET roles = query -> '$.roles';
    if (roles is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_roles_provided';
    end if; 
	
	SET @resource = JSON_UNQUOTE(query -> '$.resource');
    if (@resource is null) then
    	SIGNAL SQLSTATE '45000'
 		SET MESSAGE_TEXT = 'no_resource_provided';
    end if;
    
	set @swhere = os_allowed_reading_roles(roles, 'params');

    set @query = CONCAT(
		'SELECT  JSON_REMOVE( JSON_INSERT(params, ''$.id'', id), ''$.roles'' ) as data FROM os_items WHERE resource = ?',
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-08 19:10:27
