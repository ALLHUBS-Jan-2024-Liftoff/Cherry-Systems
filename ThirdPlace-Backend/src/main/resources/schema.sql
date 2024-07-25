-- These commented out commands are for if you want to reset your db to a clean slate between restarts.

DROP TABLE IF EXISTS debug_table;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS review_vote;
DROP TABLE IF EXISTS submission_vote;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS submission;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_seq;

CREATE TABLE IF NOT EXISTS debug_table (
    id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    pw_Hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS submission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    location_address VARCHAR(255) NOT NULL,
    place_id VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    description TEXT NOT NULL,
    submission_review TEXT NOT NULL,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES Submission(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS review_vote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    FOREIGN KEY (review_id) REFERENCES Review(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS submission_vote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES Submission(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS favorite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    submission_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (submission_id) REFERENCES Submission(id)
);

--ALTER TABLE review_vote
--DROP INDEX unique_user_review_vote;

ALTER TABLE review_vote
ADD CONSTRAINT unique_user_review_vote UNIQUE (user_id, review_id);


--ALTER TABLE submission_vote
--DROP INDEX unique_user_submission_vote;

ALTER TABLE submission_vote
ADD CONSTRAINT unique_user_submission_vote UNIQUE (user_id, submission_id);


--ALTER TABLE favorite
--DROP INDEX unique_user_submission_favorite;

ALTER TABLE favorite
ADD CONSTRAINT unique_user_submission_favorite UNIQUE (user_id, submission_id);


