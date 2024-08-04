-- sample users
INSERT INTO users (username, pw_Hash, email) VALUES
('user1', 'hashed_password_1', 'user1@example.com'),
('user2', 'hashed_password_2', 'user2@example.com'),
('user3', 'hashed_password_3', 'user3@example.com');

-- sample submissions
INSERT INTO submission (user_id, location_name, location_address, place_id, rating, description, submission_review, average_rating)
VALUES
(1, 'Mokabes Coffee House', '3606 Arsenal St, St. Louis, MO 63116, USA', 'ChIJEU0-nWe02IcR5Idj1tWs-To', 5, 'Quiet coffee house.', 'Great coffee!', 4.00),
(2, 'City Museum', '750 N 16th St, St. Louis, MO 63103, USA', 'ChIJVR6Awj2z2IcRBMqKMCBEfMk', 4, 'Giant art park where you can climb everything', 'Art is cool!', 2.67),
(3, 'Forest Park', '5595 Grand Dr, St. Louis, MO 63112, USA', 'ChIJycR4kUa12IcRqpSybQLFJ50', 2, 'Very big park, with museums ', 'Not as cool as Tower Grove Park!', 1.33);

-- sample reviews
INSERT INTO review (submission_id, user_id, rating, review_text)
VALUES
(1, 1, 5, 'Amazing experience, loved the scenery!'),
(1, 2, 4, 'This is test data for submission 1 Wow!'),
(1, 3, 3, 'Even more test data wow!'),

(2, 1, 1, 'Very crowded, but still worth visiting.'),
(2, 2, 5, 'I am obsessed with test data. I cant stop making it!'),
(2, 3, 2, 'Testing testing, one two three.'),

(3, 1, 1, 'Worst Park I have ever been to!'),
(3, 2, 2, 'Sampling data on tiny little data forks'),
(3, 3, 1, 'This is the last piece of sample data!');

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