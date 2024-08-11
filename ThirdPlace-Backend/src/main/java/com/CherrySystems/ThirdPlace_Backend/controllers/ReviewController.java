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
    @PostMapping("reviews/new")
    public ResponseEntity<?> newReview(@RequestBody RateAndReviewDTO rateAndReviewDTO, HttpSession session) {

        //Initialize a newReview object to save
        Review newReview = new Review();

        //verify user is logged in to create new review, set that user in session as the user for new review object
        User user = authenticationController.getUserFromSession(session);
        if (user == null ) {
            return ResponseEntity.badRequest().body("User must be logged in to create a new review.");
        } else {
            newReview.setUser(user);
        }

        //Get current submissionID
        Integer submissionById = rateAndReviewDTO.getSubmissionId();
        Submission reviewSubmission = submissionRepository.findById(submissionById).get();
        newReview.setSubmission(reviewSubmission);

        //set rating in new review
        newReview.setRating(rateAndReviewDTO.getRating());

        //set reviewText in new review
        newReview.setReviewText(rateAndReviewDTO.getReviewText());

        //save new review in repo
        reviewRepository.save(newReview);
        return ResponseEntity.ok("New review submitted");
    }


    //See reviews by submission
    @GetMapping("reviews")
    public ResponseEntity<?> reviewsBySubmission(@RequestParam Integer submissionId) {

        //Get current submission data by ID
        Submission submissionById = submissionRepository.findById(submissionId).get();

        //Get reviews by submission
        Integer getSubmissionId = submissionById.getId();
        List<Review> reviewList = reviewRepository.findBySubmissionId(getSubmissionId);

        //Check for reviews, populate list if reviews exist
        if (reviewList == null) {
            return ResponseEntity.badRequest().body("Reviews for this submission do not exist.");
        } else {
            return ResponseEntity.ok(reviewList);
        }

    }


    //See all reviews by userName
    //TODO: Move to a User Controller
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

    //Update review by reviewID
    @PatchMapping("reviews/{id}")
    public ResponseEntity<?> updateUserReviews(@RequestBody RateAndReviewDTO rateAndReviewDTO, @PathVariable Integer id, HttpSession session) {

        //Gets user from session and verify login
        User user = authenticationController.getUserFromSession(session);
        if (user == null) {
            return ResponseEntity.badRequest().body("User is not logged in.");
        }

        //Find review by ID in repository
        Review updateReview = reviewRepository.findById(id).get();


        //Check if current user is user responsible for post, if true, update user
        if (!(updateReview.getUser()).equals(user)) {
            return ResponseEntity.badRequest().body("User cannot update a review they did not write.");
        } else {
            updateReview.setUser(user);
        }

        //Check if submission is the submission for the review
        Integer submissionById = updateReview.getSubmission().getId();
        if (!(submissionById).equals(rateAndReviewDTO.getSubmissionId())) {
            return ResponseEntity.badRequest().body("Review is not for this submission.");
        } else {
            updateReview.setSubmission(updateReview.getSubmission());
        }

        //Update rating
        updateReview.setRating(rateAndReviewDTO.getRating());

        //Update reviewText
        updateReview.setReviewText(rateAndReviewDTO.getReviewText());

        //Save updated review in repository
        reviewRepository.save(updateReview);
        return ResponseEntity.ok().body("Review updated.");
    }


    //Delete reviews by reviewID
    @DeleteMapping("reviews/{id}")
    public ResponseEntity<?> deleteReviewById(@PathVariable Integer id, HttpSession session) {

        User user = authenticationController.getUserFromSession(session);
        if (user == null) {
            return ResponseEntity.badRequest().body("User is not logged in.");
        }

        //Find review by ID in repository
        Review reviewById = reviewRepository.findById(id).get();

        if (!(reviewById.getUser()).equals(user)) {
            return ResponseEntity.badRequest().body("Review can only be deleted by posting user.");
        } else {
            reviewRepository.deleteById(id);
        }
        return ResponseEntity.ok().body("Review deleted.");
    }

}
