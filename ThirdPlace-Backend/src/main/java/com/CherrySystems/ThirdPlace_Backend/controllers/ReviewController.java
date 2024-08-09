package com.CherrySystems.ThirdPlace_Backend.controllers;


import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.RateAndReviewDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @Autowired
    private AuthenticationController authenticationController;

    @PostMapping("submission/{id}")
    public ResponseEntity<?> newReview(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer id, HttpSession session) {

        Review newReview = new Review();

        User user = authenticationController.getUserFromSession(session);
        newReview.setUser(user);

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

    //See all reviews by userName
    @GetMapping("/{userName}/reviews")
    public ResponseEntity<?> userReviews(@PathVariable String userName, HttpSession session) {

        //Finds user in Repository by userName
        User user = userRepository.findByUsername(userName);

        //If user is found, will get userId, find review by userId in review repository, and return them in a list
        if (user != null) {
            Integer userId = user.getId();
            List<Review> userReviews = reviewRepository.findByUserId(userId);
            return ResponseEntity.ok(userReviews);
        } else {
            return ResponseEntity.badRequest().body("User not found.");
        }

    }

}
