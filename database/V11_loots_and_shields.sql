CREATE TABLE `attackable_coins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `reference_date` date NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `remaining_amount` int(10) unsigned NOT NULL,
  `attacks_left` int(10) unsigned NOT NULL DEFAULT 0,
  `total_attacks` int(10) unsigned NOT NULL DEFAULT 0,
  `defences_left` int(10) unsigned NOT NULL DEFAULT 0,
  `last_defense_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_processed` boolean NOT NULL default false,
  CONSTRAINT `attackable_coins_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `loot_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(10) unsigned NOT NULL,
  `engagement_id` int unsigned NOT NULL,
  `loot_code` varchar(200) NOT NULL,
  `record_time` varchar(100) NOT NULL,
  `is_used` boolean NOT NULL default false,
  CONSTRAINT `loot_details_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `loot_details_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `shield_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int unsigned NOT NULL,
  `engagement_id` int unsigned NOT NULL,
  `shields_earned` smallint unsigned NOT NULL,
  CONSTRAINT `shield_details_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `shield_details_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `user_shields` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(10) unsigned NOT NULL,
  `current_shields` smallint unsigned NOT NULL,
  CONSTRAINT `user_shields_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `user_under_attack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `attacker_id` int(10) unsigned NOT NULL,
  `defender_id` int(10) unsigned NOT NULL,
  CONSTRAINT `user_under_attack_attacker_id_fkey`
    FOREIGN KEY (attacker_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `user_under_attack_defender_id_fkey`
    FOREIGN KEY (defender_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `attack_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `attacker_id` int(10) unsigned NOT NULL,
  `defender_id` int(10) unsigned NOT NULL,
  `attackable_coin_id` int(10) unsigned NOT NULL,
  `defender_coins` int(10) unsigned NOT NULL,
  `captured_coins` int(10) unsigned NOT NULL,
  `captured_percentage` smallint unsigned NOT NULL,
  `defender_shields` smallint unsigned NOT NULL,
  `loot_code` varchar(200) NOT NULL,
  CONSTRAINT `attack_details_attacker_id_fkey`
    FOREIGN KEY (attacker_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `attack_details_defender_id_fkey`
    FOREIGN KEY (defender_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `attack_details_attackable_coin_id_fkey`
    FOREIGN KEY (attackable_coin_id) REFERENCES attackable_coins (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;
