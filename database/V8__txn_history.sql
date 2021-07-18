CREATE TABLE `coin_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_type` smallint unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
  `description` varchar(100) NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `device_balance` int(10) unsigned NOT NULL,
  `server_balance` int(10) unsigned NOT NULL,
  KEY `coin_transactions_user_id_fkey` (`user_id`),
  CONSTRAINT `coin_transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=ARIA;

CREATE INDEX idx_coin_transactions_1
ON coin_transactions(user_id);

CREATE TABLE `ticket_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `transaction_type` smallint unsigned NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
  `description` varchar(100) NOT NULL,
  `quantity` int(10) unsigned NOT NULL,
  `device_balance` int(10) unsigned NOT NULL,
  `server_balance` int(10) unsigned NOT NULL,
  KEY `ticket_transactions_user_id_fkey` (`user_id`),
  CONSTRAINT `ticket_transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=ARIA;

CREATE INDEX idx_ticket_transactions_1
ON ticket_transactions(user_id);
