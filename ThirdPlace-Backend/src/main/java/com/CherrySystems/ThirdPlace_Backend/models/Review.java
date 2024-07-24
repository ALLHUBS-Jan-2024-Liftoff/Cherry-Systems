package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "submission_id")
    private Submission submission;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @Column(name = "rating")
    private int rating;

    @NotNull
    @Column(name = "review_text", columnDefinition = "TEXT")
    private String reviewText;

    @Column(name = "review_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime reviewDate = LocalDateTime.now();


    // Constructors

    public Review() {
    }

    public Review(Submission submission, User user, int rating, String review) {
        this.submission = submission;
        this.user = user;
        this.rating = rating;
        this.reviewText = review;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Submission getSubmission() {
        return submission;
    }

    public void setSubmission(Submission submission) {
        this.submission = submission;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public LocalDateTime getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDateTime reviewDate) {
        this.reviewDate = reviewDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review1 = (Review) o;
        return id == review1.id && rating == review1.rating && Objects.equals(submission, review1.submission) && Objects.equals(user, review1.user) && Objects.equals(reviewText, review1.reviewText) && Objects.equals(reviewDate, review1.reviewDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, submission, user, rating, reviewText, reviewDate);
    }
}