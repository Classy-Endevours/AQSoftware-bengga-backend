CREATE TABLE `win_engineering_classes`
(
    `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `create_date` timestamp NOT NULL,
    `last_modified_date` timestamp NOT NULL,
    name varchar(100) NOT NULL,
    `is_deleted` boolean NOT NULL DEFAULT false
);

insert into win_engineering_classes select 1, current_timestamp, current_timestamp, 'A', false;

CREATE TABLE `win_categories`
(
    `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `create_date` timestamp NOT NULL,
    `last_modified_date` timestamp NOT NULL,
    name varchar(100) NOT NULL,
    `is_deleted` boolean NOT NULL DEFAULT false
);

insert into win_categories select 1, current_timestamp, current_timestamp, 'Consolation Prize', false;
insert into win_categories select 2, current_timestamp, current_timestamp, 'Minor Prize', false;
insert into win_categories select 3, current_timestamp, current_timestamp, 'Major Prize', false;

CREATE TABLE `win_engineering_consolidated`
(
    `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    amount int unsigned NOT NULL,
    tickets int unsigned NOT NULL,
    product_id int unsigned,
    win_engg_type varchar(10),
    CONSTRAINT `win_engineering_consolidated_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);


CREATE INDEX idx_win_engineering_consolidated_1
ON win_engineering_consolidated(win_engineering_class_id);

CREATE TABLE win_engineering_hof
(
    `id` smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    win_order int unsigned NOT NULL,
    win_category_id smallint unsigned NOT NULL,
    amount int unsigned NOT NULL,
    tickets int unsigned NOT NULL,
    product_id int unsigned,
    CONSTRAINT `win_engineering_hof_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_engineering_hof_win_category_id_fkey`
    FOREIGN KEY (win_category_id) REFERENCES win_categories (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);


CREATE INDEX idx_win_engineering_hof_1
ON win_engineering_hof(win_engineering_class_id);

CREATE INDEX idx_win_engineering_hof_2
ON win_engineering_hof(win_order);

CREATE TABLE win_engineering_jackpot
(
    id smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    win_order int unsigned NOT NULL,
    win_category_id smallint unsigned NOT NULL,
    amount int unsigned NOT NULL,
    tickets int unsigned NOT NULL,
    product_id int unsigned,
    CONSTRAINT `win_engineering_jackpot_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_engineering_jackpot_win_category_id_fkey`
    FOREIGN KEY (win_category_id) REFERENCES win_categories (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_win_engineering_jackpot_1
ON win_engineering_jackpot(win_engineering_class_id);

CREATE INDEX idx_win_engineering_jackpot_2
ON win_engineering_jackpot(win_order);

CREATE TABLE lose_engineering_jackpot
(
    id smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    lose_order int unsigned NOT NULL,
    amount1 int unsigned NOT NULL,
    amount2 int unsigned NOT NULL,
    amount3 int unsigned NOT NULL,
    product_id int unsigned,
    CONSTRAINT `lose_engineering_jackpot_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_lose_engineering_jackpot_1
ON lose_engineering_jackpot(win_engineering_class_id);

CREATE TABLE win_engineering_sequence_hof
(
    id smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    engagement_id int unsigned NOT NULL,
    sequence int unsigned NOT NULL,
    CONSTRAINT `win_engineering_sequence_hof_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_engineering_sequence_hof_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_win_engineering_sequence_hof_1
ON win_engineering_sequence_hof(win_engineering_class_id);

CREATE INDEX idx_win_engineering_sequence_hof_2
ON win_engineering_sequence_hof(engagement_id);

CREATE TABLE win_engineering_sequence_jackpot
(
    id smallint unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    engagement_id int unsigned NOT NULL,
    sequence int unsigned NOT NULL,
    CONSTRAINT `win_engineering_sequence_jackpot_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_engineering_sequence_jackpot_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_win_engineering_sequence_jackpot_1
ON win_engineering_sequence_jackpot(win_engineering_class_id);

CREATE INDEX idx_win_engineering_sequence_jackpot_2
ON win_engineering_sequence_jackpot(engagement_id);

CREATE TABLE win_comparisons
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    user_id int unsigned NOT NULL,
    engagement_id int unsigned NOT NULL,
    actual_sequence int unsigned NOT NULL,
    win_sequence int unsigned NOT NULL,
    amount int unsigned NOT NULL,
    tickets int unsigned NOT NULL,
    product_id int unsigned,
    win_category_id smallint unsigned NOT NULL,
    is_jackpot boolean not null default false,
    is_won boolean not null default false,
    CONSTRAINT `win_comparisons_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_win_category_id_fkey`
    FOREIGN KEY (win_category_id) REFERENCES win_categories (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_win_comparisons_1
ON win_comparisons(win_engineering_class_id);

CREATE INDEX idx_win_comparisons_2
ON win_comparisons(engagement_id);

CREATE INDEX idx_win_comparisons_3
ON win_comparisons(user_id);

CREATE INDEX idx_win_comparisons_4
ON win_comparisons(is_jackpot);

CREATE INDEX idx_win_comparisons_5
ON win_comparisons(is_won);

CREATE TABLE win_comparisons_unofficial
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    win_comparison_id int unsigned NOT NULL,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    win_engineering_class_id smallint unsigned NOT NULL,
    user_id int unsigned NOT NULL,
    engagement_id int unsigned NOT NULL,
    actual_sequence int unsigned NOT NULL,
    win_sequence int unsigned NOT NULL,
    amount int unsigned NOT NULL,
    tickets int unsigned NOT NULL,
    product_id int unsigned,
    win_category_id smallint unsigned NOT NULL,
    is_jackpot boolean not null default false,
    is_won boolean not null default false,
    CONSTRAINT `win_comparisons_unofficial_win_comparison_id_fkey`
    FOREIGN KEY (win_comparison_id) REFERENCES win_comparisons (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_unofficial_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_unofficial_win_engineering_classes_id_fkey`
    FOREIGN KEY (win_engineering_class_id) REFERENCES win_engineering_classes (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_unofficial_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `win_comparisons_unofficial_win_category_id_fkey`
    FOREIGN KEY (win_category_id) REFERENCES win_categories (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_win_comparisons_unofficial_1
ON win_comparisons_unofficial(win_engineering_class_id);

CREATE INDEX idx_win_comparisons_unofficial_2
ON win_comparisons_unofficial(engagement_id);

CREATE INDEX idx_win_comparisons_unofficial_3
ON win_comparisons_unofficial(user_id);

CREATE INDEX idx_win_comparisons_unofficial_4
ON win_comparisons_unofficial(is_jackpot);

CREATE INDEX idx_win_comparisons_unofficial_5
ON win_comparisons_unofficial(is_won);

CREATE INDEX idx_win_comparisons_unofficial_6
ON win_comparisons_unofficial(win_comparison_id);

CREATE TABLE famers
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    engagement_id int UNSIGNED NOT NULL,
    engagement_title varchar(100) NOT NULL,
    player_id int UNSIGNED NOT NULL,
	player_name varchar(100) NOT NULL,
    player_avatar varchar(100) NOT NULL,
    amount INT UNSIGNED NOT NULL,
    tickets INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED,
    CONSTRAINT `famers_user_id_fkey`
    FOREIGN KEY (player_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `famers_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;

CREATE INDEX idx_famers_1
ON famers(engagement_id);

CREATE TABLE rollers
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_modified_date timestamp NOT NULL,
    engagement_id int UNSIGNED NOT NULL,
    engagement_title varchar(100) NOT NULL,
    player_id int UNSIGNED NOT NULL,
	player_name varchar(100) NOT NULL,
    player_avatar varchar(100) NOT NULL,
    amount INT UNSIGNED NOT NULL,
    tickets INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED,
    CONSTRAINT `rollers_user_id_fkey`
    FOREIGN KEY (player_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `rollers_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
) ENGINE=ARIA;

CREATE INDEX idx_rollers_1
ON rollers(engagement_id);
