-- CREATE TABLE `user` (
--                         `id` INT AUTO_INCREMENT PRIMARY KEY,
--                         `username` VARCHAR(255) NOT NULL,
--                         `password` VARCHAR(255) NOT NULL,
--                         `country` VARCHAR(255) NOT NULL,
--                         `profile_picture` VARCHAR(255) NOT NULL,
--                         `created_at` DATETIME NOT NULL
-- );
--
-- CREATE TABLE `video` (
--                          `id` INT AUTO_INCREMENT PRIMARY KEY,
--                          `title` VARCHAR(255) NOT NULL,
--                          `description` TEXT DEFAULT NULL,
--                          `thumbnail` VARCHAR(255) DEFAULT NULL,
--                          `views` INT NOT NULL DEFAULT 0,
--                          `country` VARCHAR(100) NOT NULL,
--                          `category` VARCHAR(100) NOT NULL,
--                          `googleMapsUrl` VARCHAR(255) DEFAULT NULL,
--                          `videoUrl` VARCHAR(255) DEFAULT NULL,
--                          `createdAt` DATETIME NOT NULL,
--                          `user_id` INT NOT NULL,
--                          FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
-- );
--
-- CREATE TABLE `quiz_connection` (
--                                    `id` INT AUTO_INCREMENT PRIMARY KEY,
--                                    `quiz_question_id` INT NOT NULL,
--                                    `user_id` INT NOT NULL,
--                                    `createdAt` DATETIME NOT NULL,
--                                    FOREIGN KEY (`quiz_question_id`) REFERENCES `quiz_question` (`id`) ON DELETE CASCADE,
--                                    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
-- );
--
-- CREATE TABLE `video_saved` (
--                                `video_id` INT NOT NULL,
--                                `user_id` INT NOT NULL,
--                                PRIMARY KEY (`video_id`, `user_id`),
--                                FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE,
--                                FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
-- );
--
-- CREATE TABLE `video_ratings` (
--                                  `video_id` INT NOT NULL,
--                                  `user_id` INT NOT NULL,
--                                  PRIMARY KEY (`video_id`, `user_id`),
--                                  FOREIGN KEY (`video_id`) REFERENCES `video` (`id`) ON DELETE CASCADE,
--                                  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
-- );
