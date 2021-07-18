CREATE TABLE  `store_item_categories` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(200) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE  `stores` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(200) NOT NULL,
  `is_global` boolean NOT NULL DEFAULT FALSE,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `store_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_modified_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `source_id` int(10) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  image_big varchar(1000) NOT NULL,
  image_small varchar(1000) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` numeric(10,2) NOT NULL,
  `is_active` boolean NOT NULL DEFAULT false,
  `quantity` int unsigned NOT NULL,
  `bm_value` int unsigned NOT NULL,
  `claim_info` varchar(8000) NOT NULL,
  `tickets` int unsigned NOT NULL DEFAULT 0,
  `is_mobile_load` boolean NOT NULL DEFAULT false,
  CONSTRAINT `store_items_user_id_fkey`
    FOREIGN KEY (source_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE `store_items_sked` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `store_item_category_id` smallint unsigned NOT NULL,
  `store_item_id` int unsigned NOT NULL,
  `sort_order` int unsigned NOT NULL,
  `is_active` boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT `store_items_sked_store_item_id_fkey`
    FOREIGN KEY (store_item_id) REFERENCES store_items (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `store_items_sked_store_item_category_id_fkey`
    FOREIGN KEY (store_item_category_id) REFERENCES store_item_categories (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;

CREATE TABLE `store_items_bought` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(10) unsigned NOT NULL,
  `store_item_id` int unsigned NOT NULL,
  CONSTRAINT `store_items_bought_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `store_items_bought_store_item_id_fkey`
    FOREIGN KEY (store_item_id) REFERENCES store_items (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;
