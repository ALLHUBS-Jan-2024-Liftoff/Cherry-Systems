package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submission")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepository;

    // Create A New Submission
    @PostMapping("/newsubmission")
    public Submission newSubmission(@RequestParam User user, @RequestParam String locationName, @RequestParam String locationAddress, @RequestParam String placeId, @RequestParam int rating, @RequestParam String description, @RequestParam String submissionReview) {
        Submission newSubmission = new Submission(user, locationName, locationAddress, placeId, rating, description, submissionReview);
        newSubmission.setUser(user);
        newSubmission.setLocationName(locationName);
        newSubmission.setLocationAddress(locationAddress);
        newSubmission.setPlaceId(placeId);
        newSubmission.setRating(rating);
        newSubmission.setDescription(description);
        newSubmission.setSubmissionReview(submissionReview);
        return submissionRepository.save(newSubmission);
    }

    //    View all Submissions
    @GetMapping("/searchandlist")
    public List<Submission> getAllSubmissions(){
        return (List<Submission>) submissionRepository.findAll();
    }

    // View Individual Submissions
//    @GetMapping("/")
//    public Submission indSubmission() {
//        return
//    }

}
