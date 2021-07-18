CREATE TABLE `notifications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `notification_type_id` smallint unsigned NOT NULL,
  `source_user_id` int(10) unsigned NOT NULL,
	`destination_user_id` int(10) unsigned NOT NULL,
  `is_read` boolean NOT NULL default FALSE,
  `reference_id` int(10) unsigned NULL,
  `text_format` varchar(1000) NOT NULL,
  `text_values` varchar(1000) NOT NULL,
  `expiry_date` timestamp,
  PRIMARY KEY (`id`),
  KEY `notifications_source_user_id_fkey` (`source_user_id`),
  CONSTRAINT `notifications_source_user_id_fkey` FOREIGN KEY (`source_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
	KEY `notifications_destination_user_id_fkey` (`destination_user_id`),
  CONSTRAINT `notifications_destination_user_id_fkey` FOREIGN KEY (`destination_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_1
ON notifications(is_read);

CREATE INDEX idx_notifications_2
ON notifications(notification_type_id);

CREATE INDEX idx_notifications_3
ON notifications(destination_user_id);
