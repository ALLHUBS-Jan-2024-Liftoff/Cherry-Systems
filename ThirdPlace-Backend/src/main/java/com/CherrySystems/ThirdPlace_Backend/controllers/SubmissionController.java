package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Category;
import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.SubmissionFormDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.CategoryRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.SubmissionRepository;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import jakarta.persistence.Id;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
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

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AuthenticationController authenticationController;


    //  Processes Submission Form, creating new submission.
    @PostMapping("/submitlocation")
    public Submission newSubmission(@RequestBody SubmissionFormDTO submissionFormDTO, HttpSession session) {

        Submission newSubmission = new Submission();

        // obtains current user information from session, assigns as submission user
        User user = authenticationController.getUserFromSession(session);
        newSubmission.setUser(user);

        newSubmission.setLocationName(submissionFormDTO.getLocationName());
        newSubmission.setLocationAddress(submissionFormDTO.getLocationAddress());
        newSubmission.setRating(submissionFormDTO.getRating());
        newSubmission.setDescription(submissionFormDTO.getDescription());
        newSubmission.setSubmissionReview(submissionFormDTO.getSubmissionReview());

        List<Category> categoryList = (List<Category>) categoryRepository.findAllById(submissionFormDTO.getCategories());
        newSubmission.setCategories(categoryList);
        
        //TODO: get placeID from Maps API address, currently holding dummy data to appease constructor
        newSubmission.setPlaceId("123abc");

        return submissionRepository.save(newSubmission);
    }

    //TODO: View submissions by userName

//     View all Submissions
    @GetMapping("/all")
    public List<Submission> fetchAllSubmissions(){
        return (List<Submission>) submissionRepository.findAll();
    }


    //View each submission by locationName
//    @GetMapping("/{locationName}")
//    public Submission viewSubmissionByLocationName(@PathVariable String locationName) {
//        Submission submissionByLocationName = submissionRepository.findByLocationName(locationName);
//        return submissionByLocationName;
//    }

    //View Each Submission by ID
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


   //Allows users to edit submission entity in DB
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateSubmission(@PathVariable Integer id, @RequestBody SubmissionFormDTO submissionFormDTO, HttpSession session) {

        //Finds submission by ID in repository
        Submission findInRepo = submissionRepository.findById(id).get();

        //Updates submission data only for those that were changed
        findInRepo.setLocationName(submissionFormDTO.getLocationName());
        findInRepo.setLocationAddress(submissionFormDTO.getLocationAddress());
        findInRepo.setRating(submissionFormDTO.getRating());
        findInRepo.setDescription(submissionFormDTO.getDescription());
        findInRepo.setSubmissionReview(submissionFormDTO.getSubmissionReview());

        List<Category> categoryList = (List<Category>) categoryRepository.findAllById(submissionFormDTO.getCategories());
        findInRepo.setCategories(categoryList);

        //TODO: get user from session/authentication, currently holding dummy data to appease constructor
        User user = authenticationController.getUserFromSession(session);
//        User user1 = userRepository.findByUsername("user1");
        findInRepo.setUser(user);

        //TODO: get placeID from Maps API address, currently holding dummy data to appease constructor
        findInRepo.setPlaceId("123abc");

        //saves updated information to DB
        submissionRepository.save(findInRepo);
        return ResponseEntity.ok("Submission updated.");
    }


    //Deletes submissions in Submission Repository by finding the submission by its ID#
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubmission(@PathVariable Integer id, HttpSession session) {

        User user = authenticationController.getUserFromSession(session);
        if (user == null) {
            return ResponseEntity.badRequest().body("User is not logged in.");
        }

        //Find submission by ID in repository
        Submission submissionById = submissionRepository.findById(id).get();

        if (!(submissionById.getUser()).equals(user)) {
            return ResponseEntity.badRequest().body("Submission can only be deleted by posting user.");
        } else {
            submissionRepository.deleteById(id);
        }
        return  ResponseEntity.ok("Submission deleted.");
    }

}
