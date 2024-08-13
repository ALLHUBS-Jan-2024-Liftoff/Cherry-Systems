DELIMITER //

CREATE TRIGGER update_avg_rating_after_insert
AFTER INSERT ON review
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(3, 2);
    SELECT AVG(rating) INTO avg_rating
    FROM review
    WHERE submission_id = NEW.submission_id;
    UPDATE submission
    SET average_rating = avg_rating
    WHERE id = NEW.submission_id;

        UPDATE users
        SET cherry_points = cherry_points + 5
        WHERE id = NEW.user_id;

END //

CREATE TRIGGER update_avg_rating_after_update
AFTER UPDATE ON review
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(3, 2);
    SELECT AVG(rating) INTO avg_rating
    FROM review
    WHERE submission_id = NEW.submission_id;
    UPDATE submission
    SET average_rating = avg_rating
    WHERE id = NEW.submission_id;
END //

CREATE TRIGGER update_avg_rating_after_delete
AFTER DELETE ON review
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(3, 2);
    SELECT AVG(rating) INTO avg_rating
    FROM review
    WHERE submission_id = OLD.submission_id;
    UPDATE submission
    SET average_rating = IFNULL(avg_rating, 0)
    WHERE id = OLD.submission_id;

        UPDATE users
        SET cherry_points = cherry_points - 5
        WHERE id = OLD.user_id;

END //


-- add cherry points after a submission is inserted
CREATE TRIGGER add_cherry_points_after_submission
AFTER INSERT ON submission
FOR EACH ROW
BEGIN
    UPDATE users
    SET cherry_points = cherry_points + 10
    WHERE id = NEW.user_id;
END //

-- deduct cherry points after a submission is deleted
CREATE TRIGGER deduct_cherry_points_after_submission_delete
AFTER DELETE ON submission
FOR EACH ROW
BEGIN
    UPDATE users
    SET cherry_points = cherry_points - 10
    WHERE id = OLD.user_id;
END //

-- add cherry points after a vote is made
CREATE TRIGGER add_cherry_points_after_vote
AFTER INSERT ON review_vote
FOR EACH ROW
BEGIN
    UPDATE users
    SET cherry_points = cherry_points + 1
    WHERE id = NEW.user_id;
END //

-- deduct cherry points after a vote is removed
CREATE TRIGGER deduct_cherry_points_after_vote_delete
AFTER DELETE ON review_vote
FOR EACH ROW
BEGIN
    UPDATE users
    SET cherry_points = cherry_points - 1
    WHERE id = OLD.user_id;
END //

DELIMITER ;