package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.ReviewVote;
import com.CherrySystems.ThirdPlace_Backend.models.SubmissionVote;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewVoteRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionVoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    //TODO deletes previous submission review vote when a new one is made
    @DeleteMapping("/submissionvotes/delete/{id}")
    public void deleteSubmissionVote(@PathVariable Integer id) {
        submissionVoteRepository.deleteById(id);
    }

    //TODO creates new submission review vote when none found in DB

    @PostMapping("/submissionvotes/new")
    public SubmissionVote addSubmissionVote(@RequestBody SubmissionVote submissionVote) {
        System.out.println(submissionVote);
        SubmissionVote submissionVotePrint = submissionVote;
        submissionVoteRepository.save(submissionVote);
//        System.out.println(submissionVoteRepository.save(submissionVote));
        return submissionVotePrint;
    }

    // View all submission votes for a specific user
//    @GetMapping("/submissionvotes/{userId}")
//    public List<SubmissionVote> getSubmissionFavoritesByUserId(@PathVariable Integer userId) {
//        return submissionVoteRepository.findByUserId(userId);
//    }
//    //Upvote Submission Review
//    @PostMapping(/submissionvoteup)
//    public List<SubmissionVote>

//    @PostMapping("/new")
//    public Favorite addFavorite(@RequestBody Favorite favorite) {
//        return favoriteRepository.save(favorite);
//    }
}
