package com.CherrySystems.ThirdPlace_Backend.controllers;


import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.RateAndReviewDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.ReviewRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
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

    //Create a new review
    //@PostMapping("submission/{id}")
    @PostMapping("submission/{id}/reviews/new")
    public ResponseEntity<?> newReview(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer id, HttpSession session) {

        //Initialize a newReview object to save
        Review newReview = new Review();

        //verify user is logged in to create new review, set that user in session as the user for new review object
        User user = authenticationController.getUserFromSession(session);
        if (user == null ) {
            return ResponseEntity.badRequest().body("User must be logged in to create a new review.");
        } else {
            newReview.setUser(user);
        }

        //Get current submission data from repository -> sets submission connected to review
        Optional<Submission> submissionById = submissionRepository.findById(id);
        if (submissionById.isPresent()) {
            Submission currentSubmission = submissionById.get();
            newReview.setSubmission(currentSubmission);
        }

        //set rating in new review
        newReview.setRating(rateAndReviewDTO.getRating());

        //set reviewText in new review
        newReview.setReviewText(rateAndReviewDTO.getReviewText());

        //save new review in repo
        reviewRepository.save(newReview);
        return ResponseEntity.ok("New review submitted");
    }


    @GetMapping("submission/{id}/reviews")
    public ResponseEntity<?> reviewsBySubmission(@PathVariable Integer id) {

        //Get current submission data -> get reviews by submissionId
        Optional<Submission> submissionById = submissionRepository.findById(id);
            if (submissionById.isPresent()) {
                List<Review> reviewList = reviewRepository.findBySubmission(submissionById);
                return ResponseEntity.ok(reviewList);
            } else {
                return ResponseEntity.badRequest().body("Submission not found.");
            }
    }


    // See all reviews by userName
    @GetMapping("/{userName}/reviews")
    public ResponseEntity<?> reviewsByUser(@PathVariable String userName) {

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

    //TODO: Update review by review ID
    @PatchMapping("/reviews/{id}")
    public ResponseEntity<?> updateUserReviews(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer id, HttpSession session) {

        //Gets user from session and verify login
        User user = authenticationController.getUserFromSession(session);
        if (user == null) {
            return ResponseEntity.badRequest().body("User is not logged in.");
        }

        //Find review by ID in repository
        Review reviewById = reviewRepository.findById(id).get();


        //Check if current user is user responsible for post, if true, update user
        if (!(reviewById.getUser()).equals(user)) {
            return ResponseEntity.badRequest().body("User cannot update a review they did not write.");
        } else {
            reviewById.setUser(user);
        }

        //Check if submission is the submission for the review
        Integer submissionById = reviewById.getSubmission().getId();
        if (!(submissionById).equals(rateAndReviewDTO.getSubmissionId())) {
            return ResponseEntity.badRequest().body("Review is not for this submission.");
        } else {
            reviewById.setSubmission(reviewById.getSubmission());
        }

        //Update rating
        reviewById.setRating(rateAndReviewDTO.getRating());

        //Update reviewText
        reviewById.setReviewText(rateAndReviewDTO.getReviewText());

        //Save updated review in repository
        reviewRepository.save(reviewById);
        return ResponseEntity.ok().body("Review updated.");
    }


    //TODO: Delete reviews by reviewID
    

}
