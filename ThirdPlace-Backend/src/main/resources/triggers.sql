DELIMITER //

---- updates average rating when review is made
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
END //

---- updates average rating when review is updated
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

---- updates average rating when review is deleted
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
END //

DELIMITER ;