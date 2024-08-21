package com.CherrySystems.ThirdPlace_Backend.repositories;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.SubmissionVote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionVoteRepository extends CrudRepository<SubmissionVote, Integer> {

    SubmissionVote findBySubmission(Submission submission);

}
