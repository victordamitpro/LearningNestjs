DROP DATABASE IF EXISTS `myStarterDatabase`;
create database myStarterDatabase;
use myStarterDatabase;

-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: auth_db
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_migration_table`
--

DROP TABLE IF EXISTS `auth_migration_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_migration_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_migration_table`
--

LOCK TABLES `auth_migration_table` WRITE;
/*!40000 ALTER TABLE `auth_migration_table` DISABLE KEYS */;
INSERT INTO `auth_migration_table` VALUES (1,1653756449532,'CreateUserTable1653756449532'),(2,1653762280479,'UpdateUserTableCreateBy1653762280479'),(3,1653769092673,'UpdateUserTableIncreaseMaxLengthGoogleId1653769092673');
/*!40000 ALTER TABLE `auth_migration_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createDateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `createdBy` varchar(300) DEFAULT NULL,
  `lastChangedDateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `lastChangedBy` varchar(300) DEFAULT NULL,
  `firstName` varchar(250) DEFAULT NULL,
  `lastName` varchar(250) DEFAULT NULL,
  `userName` varchar(250) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(250) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `googleId` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('057b1994-2cfa-4a3a-849b-cdbc6a1867fd',1,'2022-05-29 11:34:27.827727','Admin','2022-05-29 11:34:27.827727','Admin','hoang1','dt1','hoangdt1dxs','test1@test.com',NULL,'$2b$08$lixf/J.waoa2MBwzMBzKf.36TYMoS1hVDWfY8eMdSJtlJZFG15wkm',NULL),('0fdac1ae-1bd0-499c-8095-17b7e19d8831',1,'2022-05-30 11:38:23.693045','Admin','2022-05-30 11:38:23.693045','Admin','ghfghfg','fghfgh','fghf','fghfgr5@gmail.com','1234567890','$2b$08$jjjNocE5RwBBh0A9/AYOKOMGt78oHzatydHbKl6nHkA/dL.KyORmq',NULL),('67013367-e382-4f1e-b3f6-a431f311f25f',1,'2022-05-29 16:19:55.730000','Admin','2022-05-29 16:19:55.730000','Admin','Hoang','Dam',NULL,'hoangdt30081@gmail.com',NULL,NULL,'ya29.a0ARrdaM8vPsCKiPMwaUZL5b52PnSE_Feamm1f5cIjqYWjpk03d7dAAvqmE1aYFSKgpEH6W4aGmxr9ZTEzGMutLLDl8tgnZjOqzBmnVHfCqfNW5fdavqdIu82u66hbvoz_7iBUFmi6smbUJeJ4yo89Z4Qf_GRr'),('6970a10a-68bb-4a22-8d8b-615d601215de',1,'2022-05-30 11:18:26.983985','Admin','2022-05-30 11:18:26.983985','Admin','hoang1','dt1','hoangdt331dxs','dfrê13313trt@gmail.com','1234567890','$2b$08$Hdbahkv/A4qrwtxejhkSGOSw9/YC/4WUIAEEUWFzWl9CWWOuKrcyS',NULL),('6a2dddeb-4172-4c18-85ab-ee1e1d80b450',1,'2022-05-30 11:18:16.081885','Admin','2022-05-30 11:18:16.081885','Admin','hoang1','dt1','hoangdt331dxs','dfrê1313trt@gmail.com','1234567890','$2b$08$eYF8kbBIklpvEiOMP2GEBOYjwDS/86MLYMB0esGUoPOpgpxpnwErK',NULL),('960ef7eb-d7ad-49ab-9495-c9669354ec9d',1,'2022-05-29 16:00:04.911000','Admin','2022-05-29 16:00:04.911000','Admin','Hoang','Dam',NULL,'hoangdt0308@gmail.com',NULL,NULL,'ya29.a0ARrdaM-SPi82320dqpLTnZI1WOMk60dNoE-XhPTcUUSJPI811KYNvixlwybrQUNq1X7hg2kGI3nXRFj-98GbYamUWBy6Q-DbTjOjQ-sSBa95r-P8vFf4K_l9QXm1Mzc3luK6ax0d3PmoLRJQ0wafrJeE2ZKd'),('b6d2ca5b-fcee-4b95-a274-0f4ab11c985d',1,'2022-05-29 16:10:43.515000','Admin','2022-05-29 16:10:43.515000','Admin','Hoang','Dam',NULL,'hoangdt38it@gmail.com',NULL,NULL,'ya29.a0ARrdaM8IILB_ofGGoIfQdbYRCrcKk64ahTbr_tqh2q0CMSl57INmcySVcjv9anqIFtDE5WhOG77bd-J89FCN0-7k2IH8qm3dAqYjtEfTwfD4L5Jv9STwuJ30ccDQzuoF9OEhzt17mnyZd3zr1ana-1zMBk-E'),('b7a48e2d-7302-4244-a32c-9cf9746ca902',1,'2022-05-29 12:01:00.439690','Admin','2022-05-29 12:01:00.439690','Admin','hoang1','dt1','hoangdt1dxs','test5@test.com',NULL,'$2b$08$EZHeDLEZSfmvQjbXoJRpz.wqvNWIWpsFx4l5Bob6PvUAobTGk82tm',NULL),('d105d4d8-c8f0-4349-8a49-26726c6fb39a',1,'2022-05-29 02:43:20.177186','Admin','2022-05-29 02:43:20.177186','Admin','hoang1','dt1','hoangdt1dxs','test@test.com',NULL,'$2b$08$n.PiGHYgKEy0/HLz1nGmHOhm2G69W4vvfowQTmdrVxkb3Ubfn7chm',NULL),('d68b1164-4667-424a-bdb1-fbd29969a294',1,'2022-05-29 03:18:47.713000','Admin','2022-05-29 03:18:47.713000','Admin','Victor','Dam',NULL,'victordamitpro@gmail.com',NULL,NULL,'ya29.a0ARrdaM-BYy9pBZpVhL4Mpp__NNh9EtF1qVookjvQJZp5uCL3rZg_jxfbz4S2Ne85Z1Pr7WXqh4FPARaUG1WLABezFkelL4l_bTlzaSHBAmM72CTQK19ZEbqmhS8V-LuI3Qv5DQs6GOU8bNyAH7ztsS4nuX7I'),('ddcf4219-bc29-4bd3-b880-89a8be9df121',1,'2022-05-30 11:09:31.255441','Admin','2022-05-30 11:09:31.255441','Admin','hoang1','dt1','hoangdt1dxs','dfrêtrt@gmail.com','+84915252698','$2b$08$oe4SwW7JWRH0cPC.DcWpF.RTs9e3XO8/hCDQbkb6rWEGhPywiF6T6',NULL);
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

-- Dump completed on 2022-05-30 21:25:24
