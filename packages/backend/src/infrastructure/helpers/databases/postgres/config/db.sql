-- id int primary key GENERATED ALWAYS AS IDENTITY 

CREATE TYPE role_type AS ENUM ('user', 'admin');

-- CREATE TYPE private_type AS ENUM ('all', 'liked', 'none');

CREATE TYPE target_type AS ENUM('friend', 'relation', 'chat', 'hobby');
-- ALTER TABLE users ADD COLUMN google_id VARCHAR(21) UNIQUE
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(256) UNIQUE NOT NULL,
	password VARCHAR(256),
	role role_type DEFAULT 'user' NOT NULL,
	google_id VARCHAR(21) UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE users
ADD CONSTRAINT auth_method_check
CHECK ((google_id IS NOT NULL AND password IS NULL)
OR (google_id IS NULL AND password IS NOT NULL));

CREATE TABLE forms (
	id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	name VARCHAR(32) NOT NULL,
  sex BOOLEAN NOT NULL,
	age INT NOT NULL CHECK (age BETWEEN 18 AND 122),
	avatar TEXT,
	description TEXT, 
	target target_type NOT NULL,
	-- target_custom VARCHAR(32),
	city VARCHAR(64) NOT NULL,
	last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	location GEOGRAPHY(Point, 4326)
);

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	userid INT REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	liked_userid INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	UNIQUE (userid, liked_userId),
	CHECK (userid <> liked_userId),
	FOREIGN KEY (liked_userId) REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- CREATE TABLE private (
-- 	id INT PRIMARY KEY REFERENCES forms(id) ON DELETE CASCADE NOT NULL,
-- 	surname private_type DEFAULT 'none' NOT NULL,
-- 	city private_type DEFAULT 'all' NOT NULL
-- );

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE user_tags (
  id INT REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  tagid INT REFERENCES tags(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  PRIMARY KEY (id, tagId)
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	fromid INT REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	toid INT REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	text TEXT NOT NULL,
	files TEXT[],
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE posts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
  userid INT REFERENCES forms(id) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
  text VARCHAR(4096) NOT NULL DEFAULT '',
  files TEXT[] NOT NULL DEFAULT '{}',
  CHECK (COALESCE(array_length(files, 1), 0) <= 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- CREATE TABLE tokens (
-- 	id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
-- 	token VARCHAR(256) UNIQUE NOT NULL
-- );

CREATE INDEX idx_from_to ON messages(fromid, toid);
CREATE INDEX idx_fromid ON messages(fromid);
CREATE INDEX idx_toid ON messages(toid);

CREATE INDEX idx_target ON forms(target);
CREATE INDEX idx_city ON forms(city);
CREATE INDEX idx_location ON forms USING GIST (location);

CREATE INDEX idx_liked_userid ON likes(liked_userid);

CREATE INDEX idx_user_tags_id ON user_tags(id);
CREATE INDEX idx_user_tags_tagid ON user_tags(tagid);

-- CREATE EXTENSION IF NOT EXISTS postgis;
-- CREATE EXTENSION IF NOT EXISTS pg_trgm;