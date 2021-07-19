CREATE TABLE fun_type_families
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    old_id BINARY(16) NULL, -- uuid
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    name varchar(100) NOT NULL,
		is_deleted boolean NOT NULL DEFAULT false
);

insert into fun_type_families
(SELECT null, UUID_TO_BIN('0fab0482-e393-11e6-bf01-fe55135034f3', true), NOW(), NOW(), 'Famer', false UNION ALL
SELECT null, UUID_TO_BIN('0fab0acc-e393-11e6-bf01-fe55135034f3', true), NOW(), NOW(), 'Jackpot', false UNION ALL
SELECT null, UUID_TO_BIN('0fab0572-e393-11e6-bf01-fe55135034f3', true), NOW(), NOW(), 'Battle', false UNION ALL
SELECT null, UUID_TO_BIN('0fab0b94-e393-11e6-bf01-fe55135034f3', true), NOW(), NOW(), 'Tourney', false)

CREATE TABLE featured_engagement_items
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fun_type_family_id int unsigned NOT NULL, 
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
		sort_order int unsigned NOT NULL, 
		engagement_id int unsigned NOT NULL, 
		publish_time timestamp NOT NULL,
    is_special boolean NOT NULL DEFAULT false,
		preloader_image_big varchar(1000),
		postloader_image_big varchar(1000),
		join_type int unsigned NOT NULL DEFAULT 0, 
		target_score int unsigned NOT NULL DEFAULT 0, 
		top_players int unsigned NOT NULL DEFAULT 0, 
		join_fee int unsigned NOT NULL DEFAULT 0, 
		join_ticket int unsigned NOT NULL DEFAULT 0, 
		join_hour int unsigned NOT NULL DEFAULT 24, 
		join_fee_type int unsigned NOT NULL DEFAULT 0, 
		pot_money integer NOT NULL DEFAULT 0,
		user_cap integer NOT NULL DEFAULT 0,
		tourney_winners_url varchar(1000),
		CONSTRAINT `featured_engagement_items_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
		CONSTRAINT `featured_engagement_items_fun_type_family_id_fkey`
    FOREIGN KEY (fun_type_family_id) REFERENCES fun_type_families (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE tournament_prizes
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
		engagement_id int unsigned NOT NULL, 
		rank int unsigned NOT NULL DEFAULT 0, 
		product_id int unsigned NULL, 
		bm_amount int unsigned NOT NULL DEFAULT 0, 
		name varchar(100) NOT NULL,
		CONSTRAINT `tournament_prizes_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE engagement_sked
(
	id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  create_date timestamp NOT NULL,
  last_modified_date timestamp NOT NULL,
	publish_time timestamp NOT NULL,
	is_active boolean NOT NULL DEFAULT false,
	json_data JSON NOT NULL
) ENGINE=ARIA;


CREATE INDEX idx_featured_engagement_items_1
    ON featured_engagement_items(publish_time);

CREATE INDEX idx_featured_engagement_items_2
    ON featured_engagement_items(engagement_id);
		
		
CREATE INDEX idx_engagement_sked_1
    ON engagement_sked(publish_time);
		
CREATE INDEX idx_engagement_sked_2
    ON engagement_sked(is_active);

ALTER TABLE featured_engagement_items
ADD COLUMN is_active boolean NOT NULL DEFAULT false;

CREATE INDEX idx_featured_engagement_items_3
    ON featured_engagement_items(is_active);

