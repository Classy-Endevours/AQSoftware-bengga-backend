CREATE TABLE parameters
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
		create_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		name varchar(100) NOT NULL,
		value varchar(100) NOT NULL
);

--------------- sample data
-- INSERT INTO parameters
-- SELECT 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Offer', 'Web 3.0' UNION ALL
-- SELECT 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Protection Split', '0.5' UNION ALL
-- SELECT 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Pot Money', '0.9' UNION ALL
-- SELECT 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Referral hours', '72' UNION ALL
-- SELECT 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Defend interval minutes', '30' UNION ALL
-- SELECT 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Max loots per engagement', '1' UNION ALL
-- SELECT 7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Max shields per engagement', '3' UNION ALL
-- SELECT 8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Joins to loot', '5' UNION ALL
-- SELECT 9, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Joins to shield', '5' UNION ALL
-- SELECT 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'For protection percentage', '0.5' UNION ALL
-- SELECT 11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Max user shields at a time', '5' UNION ALL
-- SELECT 12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Max defence per day', '24' UNION ALL