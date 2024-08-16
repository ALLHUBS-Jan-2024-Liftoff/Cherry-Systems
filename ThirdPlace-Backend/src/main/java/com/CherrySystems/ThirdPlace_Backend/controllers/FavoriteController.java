package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Favorite;
import com.CherrySystems.ThirdPlace_Backend.repositories.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;
    // View all favorites for a specific user
    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUserId(@PathVariable Integer userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // Add a new favorite
    @PostMapping("/new")
    public Favorite addFavorite(@RequestBody Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

    // Delete a favorite by ID
    @PostMapping("/delete")
    public String deleteFavorite(@RequestParam Integer favoriteId) {
        favoriteRepository.deleteById(favoriteId);
        return "Deleted Favorite ID: " + favoriteId;
    }
}
