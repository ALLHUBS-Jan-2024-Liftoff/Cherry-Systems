package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.*;
import com.CherrySystems.ThirdPlace_Backend.models.dto.ReviewVoteDTO;
import com.CherrySystems.ThirdPlace_Backend.models.dto.SubmissionVoteDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewVoteRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionVoteRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/votes")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {

    @Autowired
    private SubmissionVoteRepository submissionVoteRepository;

    @Autowired
    private ReviewVoteRepository reviewVoteRepository;

    @Autowired
    private AuthenticationController authenticationController;

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @GetMapping("/submissionvotes")
    public List<SubmissionVote> fetchSubmissionVotes(){
        return (List<SubmissionVote>) submissionVoteRepository.findAll();
    }

    @GetMapping("/reviewvotes")
    public List<ReviewVote> fetchReviewVotes(){
        return (List<ReviewVote>) reviewVoteRepository.findAll();
    }

    //deletes previous submission review vote when a new one is made
    @DeleteMapping("/submissionvotes/delete/{id}")
    public void deleteSubmissionVote(@PathVariable Integer id) {
        submissionVoteRepository.deleteById(id);
    }

    // TODO deletes previous review vote when a new one is made - might be ready to go already!
    @DeleteMapping("/reviewvotes/delete/{id}")
    public void deleteReviewVote(@PathVariable Integer id) {
        reviewVoteRepository.deleteById(id);
    }

    // creates new submission review vote when none found in DB

    @PostMapping("/submissionvotes/new")
    public SubmissionVote addSubmissionVote(@RequestBody SubmissionVoteDTO submissionVoteDTO, HttpSession session) {

        // obtains current user information from session, assigns as submission user
        User user = authenticationController.getUserFromSession(session);

        Optional<Submission> submissionById = submissionRepository.findById(submissionVoteDTO.getSubmissionId());

        SubmissionVote newSubmissionVote = new SubmissionVote();

        newSubmissionVote.setSubmission(submissionById.get());
        newSubmissionVote.setUser(user);
        newSubmissionVote.setVoteType(submissionVoteDTO.getVoteType());

        return submissionVoteRepository.save(newSubmissionVote);
    }


    // TODO Create new Review Vote when none found in DB
    @PostMapping("/reviewvotes/new")
    public ReviewVote addReviewVote(@RequestBody ReviewVoteDTO reviewVoteDTO, HttpSession session) {

        // obtains current user information from session, assigns as submission user
        User user = authenticationController.getUserFromSession(session);

        Optional<Review> reviewById = reviewRepository.findById(reviewVoteDTO.getReviewId());

        SubmissionVote newSubmissionVote = new SubmissionVote();

        newSubmissionVote.setReviewId(reviewById.get());
        newSubmissionVote.setUser(user);
        newSubmissionVote.setVoteType(reviewVoteDTO.getVoteType());

        return reviewVoteRepository.save(new ReviewVote());
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
