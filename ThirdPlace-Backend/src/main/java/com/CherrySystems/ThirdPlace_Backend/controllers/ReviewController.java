package com.CherrySystems.ThirdPlace_Backend.controllers;


import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.RateAndReviewDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

// @RequestMapping("api"), add submission/{id} to PostMapping, use {id} to locate submission

@RestController
@RequestMapping("api/")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubmissionRepository submissionRepository;

    @PostMapping("submission/{id}")
    public ResponseEntity<?> newReview(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer id) {

        Review newReview = new Review();

        //TODO: get user from session/authentication, currently holding dummy data to appease constructor
        User user1 = userRepository.findByUsername("user1");
        newReview.setUser(user1);

        //Get current submission data from repository -> sets submission connected to review
        Optional<Submission> submissionById = submissionRepository.findById(id);
        if (submissionById.isPresent()) {
            Submission currentSubmission = submissionById.get();
            newReview.setSubmission(currentSubmission);
        }

        newReview.setRating(rateAndReviewDTO.getRating());
        newReview.setReviewText(rateAndReviewDTO.getReviewText());

        reviewRepository.save(newReview);
        return ResponseEntity.ok("New review submitted");
    }

    //See all reviews by UserID
//    @GetMapping("/{userID}/reviews")
//    public ResponseEntity<Review> userReviews(@PathVariable Integer userId, Review review) {
//        User user =
//
//        }
//    }


    

}
