CREATE DATABASE IF NOT EXISTS medina_test;

use medina_test;

DROP TABLE IF EXISTS `plans`;
CREATE TABLE `plans` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `duration` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `plans` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_97672ac88f789774dd47f7c8be3` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `users` WRITE;
UNLOCK TABLES;



DROP TABLE IF EXISTS `users_plans`;
CREATE TABLE `users_plans` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,


  PRIMARY KEY (`id`),
  KEY `FK_0d68633c9c17c234eb4c09382ad` (`user_id`),
  KEY `FK_56809222b2e55ab4e12c28f9915` (`plan_id`),
  CONSTRAINT `FK_0d68633c9c17c234eb4c09382ad` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_56809222b2e55ab4e12c28f9915` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_plans` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `users_payments`;
CREATE TABLE `users_payments` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `payment_value` int NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `payment_date` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_payments` WRITE;
UNLOCK TABLES;