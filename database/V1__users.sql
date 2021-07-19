DELIMITER $$

CREATE FUNCTION BIN_TO_UUID(b BINARY(16), f BOOLEAN)
RETURNS CHAR(36)
DETERMINISTIC
BEGIN
   DECLARE hexStr CHAR(32);
   SET hexStr = HEX(b);
   RETURN LOWER(CONCAT(
        IF(f,SUBSTR(hexStr, 9, 8),SUBSTR(hexStr, 1, 8)), '-',
        IF(f,SUBSTR(hexStr, 5, 4),SUBSTR(hexStr, 9, 4)), '-',
        IF(f,SUBSTR(hexStr, 1, 4),SUBSTR(hexStr, 13, 4)), '-',
        SUBSTR(hexStr, 17, 4), '-',
        SUBSTR(hexStr, 21)
    ));
END$$


CREATE FUNCTION UUID_TO_BIN(uuid CHAR(36), f BOOLEAN)
RETURNS BINARY(16)
DETERMINISTIC
BEGIN
  RETURN UNHEX(CONCAT(
  IF(f,SUBSTRING(uuid, 15, 4),SUBSTRING(uuid, 1, 8)),
  SUBSTRING(uuid, 10, 4),
  IF(f,SUBSTRING(uuid, 1, 8),SUBSTRING(uuid, 15, 4)),
  SUBSTRING(uuid, 20, 4),
  SUBSTRING(uuid, 25))
  );
END$$

DELIMITER ;


CREATE TABLE users
(
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    old_id BINARY(16) NULL, -- uuid
    create_date timestamp NOT NULL,
    last_modified_date timestamp NOT NULL,
    user_type smallint NOT NULL,
    display_name varchar(100) NOT NULL,
    avatar_big varchar(1000),
    avatar_small varchar(1000),
    is_deleted boolean NOT NULL DEFAULT false,
    api_key varchar(50) NOT NULL,
    firstname varchar(100),
    lastname varchar(100),
	phone_number varchar(20),
    referred_by_id int UNSIGNED,
    socket_id varchar(50),
    online_status smallint DEFAULT 0,
    CONSTRAINT users_display_name_key UNIQUE (display_name),
		CONSTRAINT `users_referred_by_id_fkey`
    FOREIGN KEY (referred_by_id) REFERENCES users (id)
    ON DELETE CASCADE
    ON UPDATE RESTRICT
);

CREATE INDEX idx_users_old_id
    ON users(old_id);
    
CREATE INDEX idx_users_display_name
    ON users(display_name);

CREATE INDEX idx_users_online_status
    ON users(online_status);

CREATE INDEX idx_users_phone_number
    ON users(phone_number);

CREATE INDEX idx_users_socket_id
    ON users(socket_id);
		
		insert into users
		select 1, uuid_to_bin("92d3ae60-725e-11ea-89b2-0242ac110008", true),	"2020-03-30 08:15:10.406",	"2020-11-21 09:58:08.708",	0,	"Zoren8",	"https://s3.amazonaws.com/famers/720/F1527703446221P2NJVO.jpg",	"https://s3.amazonaws.com/famers/160/F1527703446221P2NJVO.jpg", false,
	"KgbJBRPxj5IvwYUy898DW4FUcmyrPatR","James",	"Cruz","639171234567",null,			"2ISuHAKPrDl94je1AAK9",	0;
	
	insert into users
		select 2, uuid_to_bin("ab580a00-650e-11e6-a4d1-0242ac110005", true),	"2020-03-30 08:15:10.406",	"2020-11-21 09:58:08.708",	1,	"Bengga",	"https://s3.amazonaws.com/famers/720/F909706946442E5QND4.png",	"https://s3.amazonaws.com/famers/160/F909706946442E5QND4.png", false,
	"rxeXkeiohOPFOhG3hAjBWtxy9BTNdNXg","James",	"Cruz","639177654321",null,		null,	0;
	
	insert into users
	select null, uuid_to_bin("d58252e0-7266-11ea-89b2-0242ac110008", true),	"2020-03-30 09:14:18.254",	"2020-04-02 04:28:48.016",	0,	"mikiliuson","","",FALSE,"eXgNZpNIXr12VyQMBIW0t2J8OsbWXvTp","Dominique","Liuson","+639988620284",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("d81818f0-7266-11ea-89b2-0242ac110008", true),	"2020-03-30 09:14:22.591",	"2020-04-02 07:13:19.133",	0,	"shan","","",FALSE,"84fxvYXybtwO6Y8nC8Vtc9FpRjEzHIBr","Shan","Clemente","+639199112700",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("f6d4e700-7266-11ea-89b2-0242ac110008", true),	"2020-03-30 09:15:14.16",	"2020-04-02 07:07:50.737",	0,	"Albert","https://s3.amazonaws.com/famers/720/F327155327415BN0DJU.jpg","https://s3.amazonaws.com/famers/160/F327155327415BN0DJU.jpg",FALSE,"xAa04UvJrlqsfRSoP7gsWlkcHfI0XDVb","Albert","Nicomedez","+63099985317640",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("124485e0-7267-11ea-89b2-0242ac110008", true),	"2020-03-30 09:16:00.19",	"2020-04-02 07:13:19.133",	0,	"jan","https://s3.amazonaws.com/famers/720/F373360622110PNK4M0.jpg","https://s3.amazonaws.com/famers/160/F373360622110PNK4M0.jpg",FALSE,"k4FHMKFGNlJvfP104iuigftbARL6GqEE","Jan","Maceda","+639055137634",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("2b5489e0-7267-11ea-89b2-0242ac110008", true),	"2020-03-30 09:16:42.238",	"2020-04-02 07:13:19.133",	0,	"seanjersen","","",FALSE,"rMjdKkIl5YnPfDfyjJRgePCSbBnL30Dm","Sean","Tan","+639178514643",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("9afc37c0-7267-11ea-89b2-0242ac110008", true),	"2020-03-30 09:19:49.564",	"2020-03-30 09:19:49.564",	0,	"sophiamay","","",FALSE,"AwmrkPbbekKq99DUT6Oz4ZexedyOPi1M","Sophia","Bulalacao","+639178887516",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("1814c100-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:23:19.44",	"2020-04-02 07:05:06.553",	0,	"sambrite","","",FALSE,"ejNqFiuCL3UiYFJByaF9iCdoL1uUa4zA","Samantha","Maliuanag","+639178287266",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("1a538d70-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:23:23.207",	"2020-03-30 09:23:23.207",	0,	"ALLYANA","","",FALSE,"DJVDuAj67gX1nNibmhsjY1W7Ja7KM1uq","Allyana","Dee","+639178989324",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("438f2000-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:24:32.384",	"2020-04-02 04:28:48.016",	0,	"mendez.m","","",FALSE,"iYMFvNzE5jXaSKRXihW0OkOMp9zPXNlg","Maggie","Mendez","+639178502022",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("4a532670-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:24:43.735",	"2020-04-02 04:28:48.016",	0,	"reinaloons","","",FALSE,"UsHY0vvmsSqlfTRfJTN6vG0er9WaCnMH","Reina","Luna","+639178147190",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("518afd50-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:24:55.845",	"2020-04-02 04:28:48.016",	0,	"Ghia","","",FALSE,"Bq3dgoc6ugMp7Z7mJvyuhoNhNsOzhy4z","Ghia","Chupungco","+639285054618",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("5ecf2360-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:25:18.102",	"2020-04-02 04:28:48.016",	0,	"FriedEgg","","",FALSE,"p6gVqn8oVHFb30QBWFFph1KFxnTJlgDf","Enzo","Jover","+639293399882",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("72c379c0-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:25:51.58",	"2020-04-02 04:28:48.016",	0,	"audreya","","",FALSE,"asmES4AQWXhJLJpWKseiUCYqYTZBqAkV","Audrey","Adarme","+639178310238",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("7458bfc0-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:25:54.236",	"2020-04-02 04:28:48.016",	0,	"gabbeep","https://s3.amazonaws.com/famers/720/F373360622089GJSED1.jpg","https://s3.amazonaws.com/famers/160/F373360622089GJSED1.jpg",FALSE,"JXJBFBLm6fi4T8btgwV8A76AjUm4jTTt","Gabbee","Pinga","+639178833697",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("891e6fe0-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:26:29.086",	"2020-03-30 09:26:29.086",	0,	"kay","","",FALSE,"6x9aDxy8I50oyCFa1ViolAjwUkzHbqba","Kay","D","+639209001024",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("d414ce40-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:28:34.852",	"2020-03-30 09:28:34.852",	0,	"sophiaa12","","",FALSE,"TzbVt3RDrDKzBEMdNOeveEFK76udIIzg","Sophia","Arellano","+639175110353",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("eabf1ce0-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:29:12.878",	"2020-04-02 04:28:48.016",	0,	"robyndg","","",FALSE,"cL2JsEDjggSZnQ9ZNTF14gOYf2WilBQ1","Robyn","DeGuzman","+6309989642019",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("eedbd110-7268-11ea-89b2-0242ac110008", true),	"2020-03-30 09:29:19.777",	"2020-04-02 07:13:19.133",	0,	"jar","","",FALSE,"X7Yby3Ekh4nuqyqeh6Ytx9vKuwfRornX","Joshua","Escaño","+639175980503",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("027b9ed0-7269-11ea-89b2-0242ac110008", true),	"2020-03-30 09:29:52.701",	"2020-04-02 07:13:19.133",	0,	"tyleroyek","","",FALSE,"YLSLP07l8FedAOa07WFWwM6eUMEpTVJi","BenedictTyler","O’yek","+639065615280",NULL,NULL,0 UNION ALL
select null, uuid_to_bin("028a6be0-7269-11ea-89b2-0242ac110008", true),	"2020-03-30 09:29:52.798",	"2020-04-02 04:28:48.016",	0,	"gian817","","",FALSE,"OLzjiIhpIC3maS95GViNEz95Hcj23qPE","Gian","Fausto","+639178400920",NULL,NULL,0;
