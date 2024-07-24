package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "favorite")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "submission_id")
    private Submission submission;

    //Constructors

    public Favorite() {
    }

    public Favorite(int id, User user, Submission submission) {
        this.user = user;
        this.submission = submission;
    }

    //Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Submission getSubmission() {
        return submission;
    }

    public void setSubmission(Submission submission) {
        this.submission = submission;
    }

    //Equals and hashcode

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Favorite favorite = (Favorite) o;
        return id == favorite.id && Objects.equals(user, favorite.user) && Objects.equals(submission, favorite.submission);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, user, submission);
    }
}
