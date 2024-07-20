-- sample users
INSERT INTO users (username, pw_Hash, email) VALUES
('user1', 'hashed_password_1', 'user1@example.com'),
('user2', 'hashed_password_2', 'user2@example.com'),
('user3', 'hashed_password_3', 'user3@example.com');

-- sample submissions
INSERT INTO submission (user_id, location_name, location_address, place_id, rating, description, submission_review)
VALUES
(1, 'Mokabes Coffee House', '3606 Arsenal St, St. Louis, MO 63116, USA', 'ChIJEU0-nWe02IcR5Idj1tWs-To', 5, 'Quiet coffee house.', 'Great coffee!'),
(2, 'City Museum', '750 N 16th St, St. Louis, MO 63103, USA', 'ChIJVR6Awj2z2IcRBMqKMCBEfMk', 4, 'Giant art park where you can climb everything', 'Art is cool!'),
(3, 'Forest Park', '5595 Grand Dr, St. Louis, MO 63112, USA', 'ChIJycR4kUa12IcRqpSybQLFJ50', 2, 'Very big park, with museums ', 'Not as cool as Tower Grove Park!');

-- sample reviews
INSERT INTO review (submission_id, user_id, rating, review_text)
VALUES
(1, 2, 5, 'Amazing experience, loved the scenery!'),
(2, 3, 4, 'Very crowded, but still worth visiting.'),
(3, 1, 1, 'Worst Park I have ever been to!');

-- sample review votes
INSERT INTO review_vote (review_id, user_id, vote_type)
VALUES
(1, 1, 'up'),
(2, 3, 'down'),
(3, 2, 'up');

-- sample submission votes
INSERT INTO submission_vote (submission_id, user_id, vote_type)
VALUES
(1, 1, 'up'),
(2, 3, 'down'),
(3, 2, 'down');