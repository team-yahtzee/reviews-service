CREATE DATABASE IF NOT EXISTS reviews;

USE reviews;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NULL DEFAULT NULL,
  avatar VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS apartments;
CREATE TABLE IF NOT EXISTS apartments (
  id INTEGER NOT NULL AUTO_INCREMENT,
  address VARCHAR(100) NULL DEFAULT NULL,
  owned_by_user_id INTEGER(5),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER NOT NULL AUTO_INCREMENT,
  date VARCHAR(15) NULL DEFAULT NULL,
  text VARCHAR(500) NULL DEFAULT NULL,
  rating DECIMAL(5) NULL DEFAULT NULL,
  user_id INTEGER(5) NULL DEFAULT NULL,
  apartment_id INTEGER(10),
  has_response BINARY NULL DEFAULT NULL,
  owner_response VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

/**
* Execute this file from the command line by typing:
*   mysql -u root -p < database-mysql/schema.sql
* to create the database and the tables. */