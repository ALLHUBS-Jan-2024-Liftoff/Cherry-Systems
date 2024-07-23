package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.User;
import com.CherrySystems.ThirdPlace_Backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    View all Users
    @GetMapping("/all")
    public List<User> getAllUsers(){
        return (List<User>) userRepository.findAll();
    }

//    Create new User
    @PostMapping("/registration")
    public User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

//    @PostMapping("/registration")
//    public User newUser(@RequestParam String username, @RequestParam String password, @RequestParam String email){
//        User newUser = new User(username, password, email);
//        newUser.setUsername(username);
//        newUser.setPwHash(password);
//        newUser.setEmail(email);
//        return userRepository.save(newUser);
//    }

//    Delete User
    @PostMapping("/delete")
    public void deleteUser(@RequestParam Integer userId){
        userRepository.deleteById(userId);
    }

//    Edit User



}
