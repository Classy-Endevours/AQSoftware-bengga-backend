CREATE TABLE `engagement_reports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	`last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(10) unsigned NOT NULL,
	`engagement_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `engagement_reports_engagement_id_fkey` (`engagement_id`),
  CONSTRAINT `engagement_reports_engagement_id_fkey` FOREIGN KEY (`engagement_id`) REFERENCES `engagements` (`id`) ON DELETE CASCADE,
	KEY `engagement_reports_user_id_fkey` (`user_id`),
  CONSTRAINT `engagement_reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE TABLE `join_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `engagement_id` int(10) unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
  `win_criteria` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `tickets` int(10) unsigned NOT NULL,
  `difficulty_level` int(10) unsigned NOT NULL,
  `is_official` boolean NOT NULL default FALSE,
  `engagement_type` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `join_data_engagement_id_fkey` (`engagement_id`),
  CONSTRAINT `join_data_engagement_id_fkey` FOREIGN KEY (`engagement_id`) REFERENCES `engagements` (`id`) ON DELETE CASCADE,
	KEY `join_data_user_id_fkey` (`user_id`),
  CONSTRAINT `join_data_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

CREATE INDEX idx_join_data_1
    ON join_data(engagement_id);
		
CREATE INDEX idx_join_data_2
    ON join_data(user_id);
		
CREATE INDEX idx_join_data_3
    ON join_data(is_official);
		
CREATE INDEX idx_join_data_4
    ON join_data(engagement_type);
