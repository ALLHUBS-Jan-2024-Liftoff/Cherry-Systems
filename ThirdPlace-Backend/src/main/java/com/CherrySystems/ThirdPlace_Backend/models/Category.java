package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name = "category_name", unique=true)
    private String name;

//    This is just for my reference
//    private final List<String> listOfCategories = new ArrayList<>(
//            Arrays.asList("Outdoors", "Indoors", "Community Center", "Cafe", "Library", "Park", "Free", "Paid")
//    );

    @ManyToMany(mappedBy = "categories")
    private final List<Submission> submissions = new ArrayList<>();

//    Constructors
    public Category() {
    }

    public Category(@NotNull String name) {
        this.name = name;
    }

//    Getters and Setters
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

//    public List<String> getListOfCategories() {
//        return listOfCategories;
//    }

    public List<Submission> getSubmissions() {
        return submissions;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id == category.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
