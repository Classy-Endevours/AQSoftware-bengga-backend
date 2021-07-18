CREATE TABLE tourney_winners
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
		reference_date timestamp NOT NULL,
    engagement_id int UNSIGNED NOT NULL,
		engagement_title varchar(100) NOT NULL,
    player_id int UNSIGNED NOT NULL,
		player_name varchar(100) NOT NULL,
		player_avatar varchar(100) NOT NULL,
    score INT UNSIGNED NOT NULL,
		rank INT UNSIGNED NOT NULL,
		amount INT UNSIGNED NOT NULL,
		is_processed BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT `tourney_winners_user_id_fkey`
    FOREIGN KEY (player_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
		CONSTRAINT `tourney_winners_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;

CREATE TABLE `pot_money` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `engagement_id` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pot_money_engagement_id_fkey` (`engagement_id`),
  CONSTRAINT `pot_money_engagement_id_fkey` FOREIGN KEY (`engagement_id`) REFERENCES `engagements` (`id`) ON DELETE CASCADE
);

CREATE TABLE `pot_money_join` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `engagement_id` int(10) unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `is_one_time` boolean not null default false,
  PRIMARY KEY (`id`),
  KEY `pot_money_join_engagement_id_fkey` (`engagement_id`),
  CONSTRAINT `pot_money_join_engagement_id_fkey` FOREIGN KEY (`engagement_id`) REFERENCES `engagements` (`id`) ON DELETE CASCADE,
	KEY `pot_money_join_user_id_fkey` (`user_id`),
  CONSTRAINT `pot_money_join_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);


CREATE INDEX idx_tourney_winners_1
    ON tourney_winners(reference_date);

CREATE INDEX idx_tourney_winners_2
    ON pot_money(engagement_id);
		
CREATE INDEX idx_pot_money_1
    ON pot_money(engagement_id);

CREATE INDEX idx_pot_money_join_1
    ON pot_money_join(engagement_id);
    
CREATE INDEX idx_pot_money_join_2
    ON pot_money_join(user_id);
    
CREATE INDEX idx_pot_money_join_3
    ON pot_money_join(is_one_time);
