CREATE TABLE fun_types
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    old_id BINARY(16) NULL, -- uuid
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    name varchar(100) NOT NULL,
		description varchar(1000) NOT NULL,
		owner_id int UNSIGNED NOT NULL,
    image_big varchar(1000),
    image_small varchar(1000),
		is_deleted boolean NOT NULL DEFAULT false,
		type TINYINT UNSIGNED NOT NULL,
		web_url varchar(1000) NOT NULL,
		package_file_url varchar(1000) NOT NULL,
		package_file_hash varchar(100) NOT NULL,
		is_landscape boolean NOT NULL DEFAULT false,
		with_sound boolean NOT NULL DEFAULT false,
		mode TINYINT UNSIGNED NOT NULL,
		numplayers TINYINT UNSIGNED NOT NULL,
    CONSTRAINT `fun_type_owner_id_fkey`
    FOREIGN KEY (owner_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

INSERT INTO fun_types SELECT 1, UUID_TO_BIN('68fa9d00-6022-11e9-9974-000d88f48163', true), NOW(), NOW(), 'Police and thief', 'Police and thief', 2, 'https://s3.amazonaws.com/famers/720/F591829835540SXJZX.jpg', 'https://s3.amazonaws.com/famers/720/F591829835540SXJZX.jpg', false, 2, 'https://bengga-web-funtypes-sg.s3-ap-southeast-1.amazonaws.com/live/police-and-thief/index.html', 'https://bengga-web-funtypes-sg.s3-accelerate.amazonaws.com/live/police-and-thief/package.zip', '86dce4e1d9269fbaf6721425cf0f143ffd3dd510', false, false, 0, 1;
insert into fun_types
(SELECT NULL, UUID_TO_BIN('03e64220-3b38-11e9-aa97-0242ac110003', true),'2019-02-28 09:05:38.114','2020-08-27 13:11:26.453','Stickman pong', 'Stickman pong', 2, 'https://s3.amazonaws.com/famers/720/F59182983338PJ2HAG.jpg', 'https://s3.amazonaws.com/famers/720/F59182983338PJ2HAG.jpg', false, 2, 'https://s3.amazonaws.com/bengga-web-funtypes/production/stickman-pong/index.html', 'https://bengga-web-funtypes-sg.s3-ap-southeast-1.amazonaws.com/live/stickman-pong/package.zip', 'a931a98cd14bfd610065de4ec326d6f10e329058', FALSE,FALSE, 0, 1 UNION
SELECT NULL, UUID_TO_BIN('b1f44e50-3c02-11e9-b849-0242ac110003', true),'2019-03-01 09:16:28.469','2020-09-18 06:26:10.776','Biggest gum', 'Biggest gum', 2, 'https://s3.amazonaws.com/famers/720/F59182983332JYCDUQ.jpg', 'https://s3.amazonaws.com/famers/720/F59182983332JYCDUQ.jpg', false, 2, 'https://bengga-web-funtypes-sg.s3-ap-southeast-1.amazonaws.com/live/biggest-gum/index.html', 'https://bengga-web-funtypes-sg.s3-accelerate.amazonaws.com/live/biggest-gum/package.zip', 'eb272c5844f643bc8a36b8c88052b34c6cecead3', FALSE,FALSE, 0, 1)

CREATE TABLE engagements
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    old_id BINARY(16) NULL, -- uuid
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    title varchar(100) NOT NULL,
    image_big varchar(1000),
    image_small varchar(1000),
		video varchar(1000),
    is_deleted boolean NOT NULL DEFAULT false,
		source_id int UNSIGNED NOT NULL,
		fun_type_id int UNSIGNED NOT NULL,
		join_start_date  timestamp NOT NULL,
		join_end_date timestamp NOT NULL,
	variable_content JSON NULL,
    tips_image_big varchar(1000),
    CONSTRAINT `engagement_source_id_fkey`
    FOREIGN KEY (source_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
    CONSTRAINT `engagement_fun_type_id_fkey`
    FOREIGN KEY (fun_type_id) REFERENCES fun_types (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

insert into engagements SELECT 1, UUID_TO_BIN('9b50a330-bf89-11eb-a72e-7073cbc050eb', true), NOW(), NOW(), 'Hot pursuit', "https://s3.amazonaws.com/famers/720/F1299507890549BVPIJX.jpg", "https://s3.amazonaws.com/famers/160/F1299507890549BVPIJX.jpg", "https://s3.amazonaws.com/famers/mp4/F1299507890550XTD35B.mp4", false, 2, 1, '2021-05-01', '2021-06-30', null, null;
insert into engagements
(SELECT null, UUID_TO_BIN('2895bfd0-6826-11ea-a192-7073cbc050eb', true), '2020-03-17 08:10:25.753','2020-03-17 08:10:25.753','Stickman pong','https://s3.amazonaws.com/famers/720/F696773208223HTMFZA.jpg','https://s3.amazonaws.com/famers/160/F696773208223HTMFZA.jpg','https://s3.amazonaws.com/famers/mp4/F696773208224K3GCQF.mp4', false, 2, 2, '2021-05-01', '2021-06-30',null, 'https://s3.amazonaws.com/famers/720/F836642498398P2RKY3.jpg' UNION 
SELECT null, UUID_TO_BIN('9bb8bbc0-73ed-11ea-84c5-7073cbc050eb', true), '2020-04-01 07:52:52.81','2020-04-21 04:51:06.49','Biggest gum','https://s3.amazonaws.com/famers/720/F358571481297L5MZV3.jpg','https://s3.amazonaws.com/famers/160/F358571481297L5MZV3.jpg','https://s3.amazonaws.com/famers/mp4/F358571481298UEDVK4.mp4', false, 2, 3, '2021-05-01', '2021-06-30', null, 'https://s3.amazonaws.com/famers/720/F72825394811CGSKHI.jpg')

CREATE TABLE leaderboard_details
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    old_id BINARY(16) NULL, -- uuid
    last_modified_date timestamp NOT NULL,
		engagement_id int UNSIGNED NOT NULL,
    user_id int UNSIGNED NOT NULL,
    score INT UNSIGNED NOT NULL,
    CONSTRAINT `leaderboard_details_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
		CONSTRAINT `leaderboard_details_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE TABLE leaderboard
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    engagement_id int UNSIGNED NOT NULL,
    user_id int UNSIGNED NOT NULL,
    best_score INT UNSIGNED NOT NULL,
    CONSTRAINT `leaderboard_user_id_fkey`
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
		CONSTRAINT `leaderboard_engagement_id_fkey`
    FOREIGN KEY (engagement_id) REFERENCES engagements (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_leaderboard_engagement_id
    ON leaderboard(engagement_id);

CREATE INDEX idx_leaderboard_user_id
    ON leaderboard(user_id);

DELIMITER $$

CREATE OR REPLACE PROCEDURE spSelect_UsersRank(
	IN in_userid int(10),
	IN in_engagementid int(10))
BEGIN

SELECT  u.id as id, BIN_TO_UUID(u.old_id, true) AS oldId, u.display_name as displayName, u.avatar_small as avatarSmall, u.avatar_big as avatarBig,lb_user.create_date as createDate, lb_user.last_modified_date as lastModifiedDate, lb_user.best_score as bestScore, lb_user.rank, true as isYou from users u inner join (select lb.user_id, lb.create_date, lb.last_modified_date , lb.best_score, ROW_NUMBER() OVER( ORDER BY best_score desc) as rank FROM leaderboard lb where lb.engagement_id = in_engagementid and lb.best_score >= (select ll.best_score from leaderboard ll where ll.user_id = in_userid and ll.engagement_id = in_engagementid)) lb_user on lb_user.user_id = u.id where u.id = in_userid;

END$$
DELIMITER ;

DELIMITER $$

CREATE OR REPLACE PROCEDURE spInsert_ScoreByUserId(
	IN in_userid int(10),
	IN in_score  int(10),
	IN in_engagementid int(10),
    IN in_record_time varchar(50))
BEGIN

DECLARE bestscore int(10);

INSERT INTO leaderboard_details (last_modified_date, engagement_id, user_id, score)
VALUES (in_record_time, in_engagementid, in_userid, in_score);


SELECT best_score into bestscore from leaderboard where user_id = in_userid and engagement_id = in_engagementid;

IF (bestscore IS NULL) THEN
insert into leaderboard (create_date, last_modified_date, engagement_id, user_id, best_score) values (NOW(), NOW(), in_engagementid, in_userid, in_score);
ELSEIF in_score > bestscore THEN
update leaderboard set best_score = in_score, last_modified_date = NOW() where user_id = in_userid and engagement_id = in_engagementid;
SET bestscore = in_score;
END IF;

SELECT  u.id as id, BIN_TO_UUID(u.old_id, true) AS oldId, u.display_name as displayName, u.avatar_small as avatarSmall, u.avatar_big as avatarBig,
lb_user.create_date as createDate, lb_user.last_modified_date as lastModifiedDate, lb_user.best_score as bestScore, lb_user.rank, true as isYou
from users u inner join (select lb.user_id, lb.create_date, lb.last_modified_date , lb.best_score, lb.engagement_id, ROW_NUMBER() OVER( ORDER BY best_score desc) as rank
FROM leaderboard lb where lb.best_score >= bestscore and lb.engagement_id = in_engagementid) lb_user on lb_user.user_id = u.id where u.id = in_userid;

END$$

DELIMITER ;
