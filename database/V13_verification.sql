ALTER TABLE users ADD verification_code VARCHAR(50);
ALTER TABLE users ADD verification_expire DATETIME;
ALTER TABLE users ADD is_verified BOOL;