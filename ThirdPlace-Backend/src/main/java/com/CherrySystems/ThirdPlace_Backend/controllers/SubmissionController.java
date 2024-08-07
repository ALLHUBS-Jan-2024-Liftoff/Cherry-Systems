package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.SubmissionFormDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/submission")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;


//Processes Submission Form - Takes form submission data in JSON form to create an object.
//Postman request I was using for testing --> { "locationName":"Kaldi Coffee", "locationAddress":"Somewhere in STL", "rating":"4", "description":"Coffee Shop", "submissionReview":"This place has great coffee" }
    @PostMapping("/form")
    public ResponseEntity<?> newSubmission(@RequestBody SubmissionFormDTO submissionFormDTO) {

        Submission newSubmission = new Submission();

        newSubmission.setLocationName(submissionFormDTO.getLocationName());
        newSubmission.setLocationAddress(submissionFormDTO.getLocationAddress());
        newSubmission.setRating(submissionFormDTO.getRating());
        newSubmission.setDescription(submissionFormDTO.getDescription());
        newSubmission.setSubmissionReview(submissionFormDTO.getSubmissionReview());

//TODO: get user from session/authentication, currently holding dummy data to appease constructor
        User user1 = userRepository.findByUsername("user1");
        newSubmission.setUser(user1);

//TODO: get placeID from Maps API address, currently holding dummy data to appease constructor
        newSubmission.setPlaceId("123abc");

        String currentLocationName = submissionFormDTO.getLocationName();
        Submission isLocationInRepository = submissionRepository.findByLocationName(currentLocationName);


//Looks in Submission Repository for submissions with the same location. Will only save newSubmission if database search returns null
        if (isLocationInRepository == null) {
            submissionRepository.save(newSubmission);
            return ResponseEntity.ok("New Submission completed");
        } else {
            return ResponseEntity.badRequest().body("Location has already been submitted.");
        }
    }



//View all Submissions
    @GetMapping("/searchandlist")
    public List<Submission> getAllSubmissions(){
        return (List<Submission>) submissionRepository.findAll();
    }


//View Each Submission by ID
//TODO: Could create a CondensedSubmissionView model to show/view only locationName, locationAddress, description, rating, submissionReview.
//TODO: Submission model to inherit CondensedSubmissionView
    @GetMapping("/{id}")
    public ResponseEntity<?> viewSubmissionById(@PathVariable Integer id) {
        Optional<Submission> submissionById = submissionRepository.findById(id);
        if (submissionById.isPresent()) {
            Submission submission = submissionById.get();
            return ResponseEntity.ok(submission);
        } else {
            return ResponseEntity.badRequest().body("Submission not found.");
        }
    }

//Deletes submissions in Submission Repository by finding the submission by its ID#
    @DeleteMapping("/{id}")
    public void deleteSubmission(@PathVariable Integer id) {
        submissionRepository.deleteById(id);
    }
}
