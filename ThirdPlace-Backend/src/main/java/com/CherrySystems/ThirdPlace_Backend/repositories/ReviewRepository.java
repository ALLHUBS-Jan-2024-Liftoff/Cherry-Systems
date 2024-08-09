package com.CherrySystems.ThirdPlace_Backend.repositories;

import com.CherrySystems.ThirdPlace_Backend.models.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Integer> {

}
