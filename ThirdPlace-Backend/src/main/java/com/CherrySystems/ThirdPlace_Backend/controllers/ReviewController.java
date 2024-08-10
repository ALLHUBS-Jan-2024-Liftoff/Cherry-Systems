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

    //Create a new review for a submission
    //@PostMapping("submission/{id}")
    @PostMapping("reviews/new")
    public ResponseEntity<?> newReview(@RequestBody RateAndReviewDTO rateAndReviewDTO, Integer id, HttpSession session) {

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


    //
    @GetMapping("submission/{id}/reviews")
    @GetMapping("reviews")
    public ResponseEntity<?> submissionReviews(@PathVariable Integer id) {

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
    public ResponseEntity<?> userReviews(@PathVariable String userName) {

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

    //TODO: Update review by review id
    @PatchMapping("/reviews/{reviewID}")
    public ResponseEntity<?> updateUserReviews(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer reviewId, HttpSession session) {

        //Gets user from session
        User user = authenticationController.getUserFromSession(session);

        //Do not respond if user is not logged in
        if (user == null) {
            return ResponseEntity.badRequest().body("User not logged in.");
        }

        //Find review by reviewID
        Optional<Review> reviewById = reviewRepository.findById(reviewId);
        if (!reviewById.isPresent()) {
            return ResponseEntity.badRequest().body("Review does not exist.");
        }

        //Update review
        Review updateReview = new Review();

        updateReview.setUser(user);
        updateReview.setSubmission(rateAndReviewDTO.getSubmission());
        updateReview.setRating(rateAndReviewDTO.getRating());
        updateReview.setReviewText(rateAndReviewDTO.getReviewText());


        //If user is logged in, get  by userName,  and allow data changes
        if (user.getUsername().equals(userName)) {
            List<Review> userReviews = reviewRepository.findByUserName(userName);
            for (Review review : userReviews ) {

            }


            return ResponseEntity.ok(userReviews);
        }

        userName = user.getUsername();



    }

    //TODO: Delete reviews by userID

}
