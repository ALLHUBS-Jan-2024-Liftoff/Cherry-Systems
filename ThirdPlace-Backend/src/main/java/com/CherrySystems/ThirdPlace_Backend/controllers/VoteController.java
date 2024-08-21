package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.ReviewVote;
import com.CherrySystems.ThirdPlace_Backend.models.SubmissionVote;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewVoteRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {

    @Autowired
    private SubmissionVoteRepository submissionVoteRepository;

    @Autowired
    private ReviewVoteRepository reviewVoteRepository;

    @GetMapping("/submissionvotes")
    public List<SubmissionVote> fetchSubmissionVotes(){
        return (List<SubmissionVote>) submissionVoteRepository.findAll();
    }

    @GetMapping("/reviewvotes")
    public List<ReviewVote> fetchReviewVotes(){
        return (List<ReviewVote>) reviewVoteRepository.findAll();
    }

}
