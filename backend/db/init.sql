-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: amongus
-- ------------------------------------------------------
use amongus;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (  
  `id` int AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY(id),
  UNIQUE(username),
  INDEX name_ind (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `difficulty` varchar(255) DEFAULT NULL,
  PRIMARY KEY(id),
  INDEX u_ind (user_id),
  FOREIGN KEY (user_id)
      REFERENCES user(id)
      ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



--
-- Dumping data for table `task`
--
-- LOCK TABLES `task` WRITE;
-- /*!40000 ALTER TABLE `task` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `task` ENABLE KEYS */;
-- UNLOCK TABLES;




INSERT INTO user VALUES (1, "Admin Zane", "donotcopy");
INSERT INTO user VALUES (2, "Admin Lorenzo", "stupidhead");

INSERT INTO task (user_id, name, location, difficulty) VALUES (1, 'Manage Wiring','Kitchen','Hard');
-- SELECT * FROM task INNER JOIN user ON task.user_id = user.id WHERE user.id = 1;