DROP DATABASE IF EXISTS partay_tracker;
CREATE DATABASE partay_tracker;

USE partay_tracker; 

CREATE TABLE partays (
  id INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  time TIME NOT NULL, 
  host_user_id INT NOT NULL,
  partay_name VARCHAR(100) NOT NULL,
  partay_summary VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE invites (
id INT NOT NULL AUTO_INCREMENT,
partay_id INT NOT NULL,
user_id INT NOT NULL,
attending BOOLEAN DEFAULT NULL,
invite_response_text VARCHAR(255),
PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

 