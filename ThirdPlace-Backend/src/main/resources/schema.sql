CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    pwHash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE submission (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    location_address VARCHAR(255) NOT NULL,
    Place_id VARCHAR(255) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    description TEXT NOT NULL,
    submission_review TEXT NOT NULL,
    submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES Submissions(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE review_vote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    FOREIGN KEY (review_id) REFERENCES Reviews(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE submission_vote (
    id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('up', 'down') NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES Submissions(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE favorite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    submission_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (submission_id) REFERENCES Submissions(id)
);
