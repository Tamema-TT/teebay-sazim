CREATE DATABASE teebay;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  user_password VARCHAR(255),
  user_address VARCHAR(255),
  phone VARCHAR(255),
)