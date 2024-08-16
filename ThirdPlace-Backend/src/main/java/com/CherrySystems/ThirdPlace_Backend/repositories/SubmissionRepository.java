package com.CherrySystems.ThirdPlace_Backend.repositories;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubmissionRepository extends CrudRepository<Submission, Integer> {

    Submission findByLocationName(String locationName);

    Optional<Submission> findBy(String locationName);

}
