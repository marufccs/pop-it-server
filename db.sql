CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    instagram_username VARCHAR(50) NOT NULL,
    gender VARCHAR(10) NOT NULL
);

INSERT INTO users ("first name", "last name", email, "instagram username", gender) values ('Maruf', 'Mozumder', 'maruf@gmail.com', 'maruf_ccs', 'male');

ALTER TABLE users RENAME COLUMN "instagram username" TO instagram_username;