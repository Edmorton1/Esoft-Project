CREATE TYPE role_type AS ENUM ('user', 'admin');

-- CREATE TYPE private_type AS ENUM ('all', 'liked', 'none');

CREATE TYPE target_type AS ENUM('friend', 'relation', 'chat', 'hobby', 'other');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(256) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	role role_type DEFAULT 'user' NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE forms (
	id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE NOT NULL,
	name VARCHAR(32) NOT NULL,
  sex BOOLEAN NOT NULL,
	age INT NOT NULL,
	avatar TEXT,
	description TEXT, 
	target target_type NOT NULL,
	target_custom VARCHAR(32),
	city VARCHAR(64),
	location GEOGRAPHY(Point, 4326) 
  -- ПОТОМ ЕЩЁ ДОБАВИТЬ КООРДИНАТЫ
);

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	userid INT REFERENCES forms(id) ON DELETE CASCADE NOT NULL,
	liked_userid INT NOT NULL,
	UNIQUE (userid, liked_userId),
	CHECK (userid <> liked_userId),
	FOREIGN KEY (liked_userId) REFERENCES forms(id) ON DELETE CASCADE
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
  id INT REFERENCES forms(id) ON DELETE CASCADE NOT NULL,
  tagid INT REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (id, tagId)
);

CREATE TABLE messages (
	id SERIAL PRIMARY KEY,
	fromid INT REFERENCES forms(id) ON DELETE CASCADE NOT NULL,
	toid INT REFERENCES forms(id) ON DELETE CASCADE NOT NULL,
	text TEXT NOT NULL,
	files TEXT[],
	created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE tokens (
	id INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
	token VARCHAR(256) UNIQUE NOT NULL
);

CREATE INDEX idx_from_to ON messages(fromid, toid);
CREATE INDEX idx_fromid ON messages(fromid);
CREATE INDEX idx_toid ON messages(toid);

CREATE INDEX idx_target ON forms(target);
CREATE INDEX idx_city ON forms(city);
CREATE INDEX idx_location ON forms USING GIST (location);

CREATE INDEX idx_liked_userid ON likes(liked_userid);

CREATE INDEX idx_user_tags_id ON user_tags(id);
CREATE INDEX idx_user_tags_tagid ON user_tags(tagid);