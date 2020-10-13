create DATABASE medina;
use medina;

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


INSERT INTO plans (`id`,`name`,`price`,`duration`,`created_at`,`updated_at`) VALUES (1,'Silver', 69.99, 1, NOW(), NOW());
INSERT INTO plans (`id`,`name`,`price`,`duration`,`created_at`,`updated_at`) VALUES (2,'Gold', 79.99, 2, NOW(), NOW());
INSERT INTO plans (`id`,`name`,`price`,`duration`,`created_at`,`updated_at`) VALUES (3,'Diamond', 89.99, 3, NOW(), NOW());


DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int NOT NULL,
  `height` float NOT NULL,
  `weigth` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_25985d58c714a4a427ced57507b` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `students` WRITE;
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

INSERT INTO users (`id`,`name`,`email`,`age`,`password`,`isAdmin`,`created_at`,`updated_at`) VALUES (1,'admin', 'admin@system.com',18,'$2b$10$BD6FRqcGkJgqNc55mTcHbO9JTBddYXFY2cTyiMAcQBs84aT1VOAfO',true, NOW(), NOW());

DROP TABLE IF EXISTS `users_payments`;
CREATE TABLE `users_payments` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `plan_id` int NOT NULL,
  `payment_value` int NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `payment_date` timestamp NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `student-usersPayments-fk` (`student_id`),
  KEY `payments-usersPayments-fk` (`plan_id`),
  CONSTRAINT `payments-usersPayments-fk` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `student-usersPayments-fk` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users_plans`;
CREATE TABLE `users_plans` (
  `id` int NOT NULL,
  `student_id` int NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `start_date` timestamp NOT NULL,
  `plan_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `students-userPlans-fk` (`student_id`),
  KEY `plans-userPlans-fk` (`plan_id`),
  CONSTRAINT `plans-userPlans-fk` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students-userPlans-fk` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users_plans` WRITE;
UNLOCK TABLES;