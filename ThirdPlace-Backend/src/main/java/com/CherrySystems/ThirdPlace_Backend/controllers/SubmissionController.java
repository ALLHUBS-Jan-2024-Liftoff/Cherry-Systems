package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.dto.SubmissionFormDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
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


    //Processes Submission Form and displays new submission listing
    // { "locationName":"Kaldi Coffee", "locationAddress":"Somewhere in STL", "rating":"4", "description":"Coffee Shop", "submissionReview":"This place has great coffee" }
    @PostMapping("/form")
    public ResponseEntity<?> newSubmission(@RequestBody SubmissionFormDTO submissionFormDTO) {
        Submission newSubmission = new Submission();
        newSubmission.setLocationName(submissionFormDTO.getLocationName());
        newSubmission.setLocationAddress(submissionFormDTO.getLocationAddress());
        newSubmission.setRating(submissionFormDTO.getRating());
        newSubmission.setDescription(submissionFormDTO.getDescription());
        newSubmission.setSubmissionReview(submissionFormDTO.getSubmissionReview());
        submissionRepository.save(newSubmission);
        return ResponseEntity.ok("New Submission completed");

    }
//    public Submission newSubmission(String locationName, String locationAddress, Integer rating, String description, String submissionReview) {
//        Submission newSubmission = new Submission();
//        newSubmission.setLocationName(locationName);
//        newSubmission.setLocationAddress(locationAddress);
//        newSubmission.setRating(rating);
//        newSubmission.setDescription(description);
//        newSubmission.setSubmissionReview(submissionReview);
//        submissionRepository.save(newSubmission);
//        return newSubmission;
//
//    }

//    public ResponseEntity<?> addSubmission(@RequestBody SubmissionFormDTO submissionFormDTO, HttpServletRequest request) {
//
//        String locationName = submissionFormDTO.getLocationName();
//        String locationAddress = submissionFormDTO.getLocationAddress();
//        Integer rating = submissionFormDTO.getRating();
//        String description = submissionFormDTO.getDescription();
//        String submissionReview = submissionFormDTO.getSubmissionReview();
//
//
//    }

//
//        if (errors.hasErrors()) {
//            return ResponseEntity.badRequest().body(errors.getAllErrors());
//        }
//
//

//        Submission currentSubmission = submissionRepository.findByLocationName(locationName);

//        addSubmission()
//            submissionRepository.save(addSubmission);
//        }

//        return ResponseEntity.ok("New Submission completed");
//    }





    //    View all Submissions
    @GetMapping("/searchandlist")
    public List<Submission> getAllSubmissions(){
        return (List<Submission>) submissionRepository.findAll();
    }


//    View Each Submission by ID
//    TODO: Could create a CondensedSubmissionView model to show/view only locationName, locationAddress, description, rating, submissionReview.
//    TODO: Submission model to inherit CondensedSubmissionView
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


}
