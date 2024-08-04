package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.models.dto.LoginFormDTO;
import com.CherrySystems.ThirdPlace_Backend.models.dto.RegistrationFormDTO;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    public User getUserFromSession(HttpSession session) {
        Integer userId = (Integer) session.getAttribute(userSessionKey);

        if (userId == null) {
            return null;
        }

        Optional<User> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            return null;
        }

        return user.get();
    }

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getId());
    }

//    View all Users
    @GetMapping("/all")
    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }

//    Registration From authentication chapter unit 2, with JSON RequestBody
    @PostMapping("/registration")
        public ResponseEntity<?> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO,
                                                                         Errors errors, HttpServletRequest request) {

            if (errors.hasErrors()) {
                return ResponseEntity.badRequest().body(errors.getAllErrors());
            }

            String username = registrationFormDTO.getUsername();
            String email = registrationFormDTO.getEmail();
            String verifyEmail = registrationFormDTO.getVerifyEmail();
            String password = registrationFormDTO.getPassword();
            String verifyPassword = registrationFormDTO.getVerifyPassword();

            User existingUsername = userRepository.findByUsername(username);
            User existingEmail = userRepository.findByEmail(email);

            if (registrationFormDTO.getUsername().isEmpty()) {
                errors.rejectValue("username", "username.isEmpty", "Username is required.");
            } else if (existingUsername != null) {
                errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists.");
            }

            if (registrationFormDTO.getEmail().isEmpty()) {
                errors.rejectValue("email", "email.isEmpty", "Email is required.");
            } else if (existingEmail != null) {
                errors.rejectValue("email", "email.alreadyexists", "A user with that email already exists.");
            }

            if (registrationFormDTO.getVerifyEmail().isEmpty()) {
                errors.rejectValue("verifyEmail", "verifyEmail.isEmpty", "Verify Email is required.");
            } else if (!email.equals(verifyEmail)) {
                errors.rejectValue("email", "emails.mismatch", "Emails do not match.");
            }

            if (registrationFormDTO.getPassword().isEmpty()) {
                errors.rejectValue("password", "password.isEmpty", "Password is required.");
            } else if (registrationFormDTO.getVerifyPassword().isEmpty()) {
                errors.rejectValue("verifyPassword", "verifyPassword.isEmpty", "Verify Password is required.");
            } else if (!password.equals(verifyPassword)) {
                errors.rejectValue("password", "passwords.mismatch", "Passwords do not match.");
            }

            if (errors.hasErrors()) {
                return ResponseEntity.badRequest().body(errors.getAllErrors());
            } else {
                User newUser = new User(username, email, password);
                setUserInSession(request.getSession(), newUser);
                userRepository.save(newUser);

                return ResponseEntity.ok("User was successfully created!");
        }
    }

//    Registration From authentication chapter unit 2, with JSON RequestBody
    @PostMapping("/login")
    public ResponseEntity<?> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO,
                                   Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        String username = loginFormDTO.getUsername();
        String password = loginFormDTO.getPassword();
        String email = loginFormDTO.getEmail();

        User currentUsername = userRepository.findByUsername(username);
        User currentEmail = userRepository.findByEmail(email);

        if (currentUsername == null) {
            errors.rejectValue("username", "user.invalid", "The given username does not exist");
        }

        if (currentEmail == null) {
            errors.rejectValue("email", "email.invalid", "The given email does not exist");
        }

        if (!currentUsername.isMatchingPassword(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
        }

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        } else {
            setUserInSession(request.getSession(), currentUsername);

            return ResponseEntity.ok("User logged in successfully!");
        }
    }

//    Get current user from the session to use for page authorization, returns HTTP response with Ok status and the user from session
//    ResponseEntity which encapsulates the entire HTTP response, encompassing the status code, headers, and body.
    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = getUserFromSession(session);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in!");
        }

        return ResponseEntity.ok(user);
    }


//    Logout User
//    @GetMapping("/logout")
//    public String logout(HttpServletRequest request){
//        request.getSession().invalidate();
//        return "redirect:/login";
//    }
//    or
//    Logout From authentication chapter unit 2, with JSON RequestBody
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody HttpServletRequest request){
        request.getSession().invalidate();
        return ResponseEntity.ok("User is logged out!");
    }


//    Delete User
    @PostMapping("/delete")
    public void deleteUser(@RequestParam Integer userId){
        userRepository.deleteById(userId);
    }

//    TODO: Edit User method

}
