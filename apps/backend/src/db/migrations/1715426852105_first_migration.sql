-- Up Migration

CREATE TYPE user_role AS ENUM (
  'USER',
  'ADMIN'
);


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  user_role user_role DEFAULT 'USER'::user_role,
  email VARCHAR(256),
  password VARCHAR(256),
  UNIQUE(email)
);

CREATE TABLE user_information (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  first_name VARCHAR(256),
  last_name VARCHAR(256),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Down Migration
DROP TABLE users;
DROP TABLE user_information;
DROP TYPE user_role;