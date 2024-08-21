package com.CherrySystems.ThirdPlace_Backend.repositories;

import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.ReviewVote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewVoteRepository extends CrudRepository<ReviewVote, Integer> {

    ReviewVote findByReview(Review review);
}
