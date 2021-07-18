CREATE TABLE `user_balances` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user_id` int(10) unsigned NOT NULL,
  `coin_amount` int(10) unsigned NOT NULL,
  `ticket_quantity` int(10) unsigned NOT NULL,
  CONSTRAINT `user_balances_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_user_balances_1
ON user_balances(user_id);
