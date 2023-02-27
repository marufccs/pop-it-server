CREATE TABLE contents (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    challenge_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    content_tag VARCHAR(50) NOT NULL,
    content_description TEXT,
    user_name VARCHAR(50) NOT NULL,
    image_url VARCHAR(50) NOT NULL,
    published_date DATE NOT NULL,
    likes INT NOT NULL
);

INSERT INTO users ("first name", "last name", email, "instagram username", gender) values ('Maruf', 'Mozumder', 'maruf@gmail.com', 'maruf_ccs', 'male');

ALTER TABLE users RENAME COLUMN "instagram username" TO instagram_username;

ALTER TABLE contents
ALTER COLUMN image_url TYPE TEXT;