package com.CherrySystems.ThirdPlace_Backend.controllers;

import com.CherrySystems.ThirdPlace_Backend.models.Category;
import com.CherrySystems.ThirdPlace_Backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

//    View all Categories
    @GetMapping("/all")
    public List<Category> getAllCategories(){
        return (List<Category>) categoryRepository.findAll();
    }

//    Add a Category
    @PostMapping("/new")
    public Category addCategory(@RequestParam String categoryName) {
        Category newCategory = new Category();
        newCategory.setName(categoryName);
        return categoryRepository.save(newCategory);
    }

//    Delete a Category
    @PostMapping("/delete")
    public String deleteCategory(@RequestParam Integer categoryId) {
        categoryRepository.deleteById(categoryId);
        return "Deleted Category ID: " + categoryId;
    }
}
