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

//    Create new User with JSON RequestBody (delete later when fully auth)
//    @PostMapping("/registration")
//    public User newUser(@RequestBody User newUser){
//        return userRepository.save(newUser);
//    }

//    Create new User with JSON form-data Params (delete later when fully auth)
//    @PostMapping("/registration")
//    public User newUser(@RequestParam String username, @RequestParam String password, @RequestParam String email){
//        User newUser = new User(username, password, email);
//        newUser.setUsername(username);
//        newUser.setPwHash(password);
//        newUser.setEmail(email);
//        return userRepository.save(newUser);
//    }

//    Registration From authentication chapter unit 2, with JSON RequestBody
@PostMapping("/registration")
    public ResponseEntity<?> processRegistrationForm(@RequestBody @Valid RegistrationFormDTO registrationFormDTO,
                                                                     Errors errors, HttpServletRequest request) {

//    This can also be used in Spring MVC as the return value from an @Controller method:
//    @RequestMapping("/handle")
//    public ResponseEntity<String> handle() {
//        URI location = ...;
//        HttpHeaders responseHeaders = new HttpHeaders();
//        responseHeaders.setLocation(location);
//        responseHeaders.set("MyResponseHeader", "MyValue");
//        return new ResponseEntity<String>("Hello World", responseHeaders, HttpStatus.CREATED);
//    }

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        User existingUsername = userRepository.findByUsername(registrationFormDTO.getUsername());
        User existingEmail = userRepository.findByEmail(registrationFormDTO.getEmail());


        if (existingUsername != null) {
            errors.rejectValue("username", "username.alreadyexists", "A user with that username already exists");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        if (existingEmail != null) {
            errors.rejectValue("email", "email.alreadyexists", "A user with that email already exists");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        String password = registrationFormDTO.getPassword();
        String verifyPassword = registrationFormDTO.getVerifyPassword();
        String email = registrationFormDTO.getEmail();
        String verifyEmail = registrationFormDTO.getVerifyEmail();

        if (!password.equals(verifyPassword)) {
            errors.rejectValue("password", "passwords.mismatch", "Passwords do not match");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        if (!email.equals(verifyEmail)) {
            errors.rejectValue("email", "emails.mismatch", "Emails do not match");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        User newUser = new User(registrationFormDTO.getUsername(), registrationFormDTO.getPassword(), registrationFormDTO.getEmail());
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        return ResponseEntity.ok("User was successfully created!");
    }

//    Registration From authentication chapter unit 2, with JSON RequestBody
    @PostMapping("/login")
    public ResponseEntity<?> processLoginForm(@RequestBody @Valid LoginFormDTO loginFormDTO,
                                   Errors errors, HttpServletRequest request) {

        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        User theUsername = userRepository.findByUsername(loginFormDTO.getUsername());
        User theEmail = userRepository.findByEmail(loginFormDTO.getEmail());

        if (theUsername == null) {
            errors.rejectValue("username", "user.invalid", "The given username does not exist");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        if (theEmail == null) {
            errors.rejectValue("email", "email.invalid", "The given email does not exist");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        String password = loginFormDTO.getPassword();
        String email = loginFormDTO.getEmail();

        if (!theUsername.isMatchingPassword(password)) {
            errors.rejectValue("password", "password.invalid", "Invalid password");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        if (!theEmail.isMatchingPassword(email)) {
            errors.rejectValue("email", "email.invalid", "Invalid email");
            return ResponseEntity.badRequest().body(errors.getAllErrors());
        }

        setUserInSession(request.getSession(), theUsername);

        return ResponseEntity.ok("User logged in successfully");
    }

//    Logout From authentication chapter unit 2, with JSON RequestBody
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request){
        request.getSession().invalidate();
        return ResponseEntity.ok("User Logged out successfully!");
    }

//    Get current user from the session to use for page authorization, returns HTTP response with Ok status and the user from session
//    ResponseEntity which encapsulates the entire HTTP response, encompassing the status code, headers, and body.
    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(HttpSession session) {
        User user = getUserFromSession(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user logged in");
        }
        return ResponseEntity.ok(user);
    }

//    Delete User
    @PostMapping("/delete")
    public void deleteUser(@RequestParam Integer userId){
        userRepository.deleteById(userId);
    }

//    Edit User



}
