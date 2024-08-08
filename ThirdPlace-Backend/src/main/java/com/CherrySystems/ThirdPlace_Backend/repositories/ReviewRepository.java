package com.CherrySystems.ThirdPlace_Backend.repositories;

import com.CherrySystems.ThirdPlace_Backend.models.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends CrudRepository<Category, Integer> {

    Category findByName(String name);
}
