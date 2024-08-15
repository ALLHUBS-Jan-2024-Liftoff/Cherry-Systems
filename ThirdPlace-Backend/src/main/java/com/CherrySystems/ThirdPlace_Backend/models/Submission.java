package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "submission")
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @NotNull
    @Column(name = "location_name", length = 255)
    private String locationName;

    @NotNull
    @Column(name = "location_address", length = 255)
    private String locationAddress;

    @NotNull
    @Column(name = "place_id", length = 255)
    private String placeId;

    @NotNull
    @Column(name = "rating")
    private int rating;

    @NotNull
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Column(name = "submission_review", columnDefinition = "TEXT")
    private String submissionReview;

    @Column(name = "submission_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime submissionDate = LocalDateTime.now();

    @Column(name = "average_rating", precision = 3, scale = 2)
    private BigDecimal averageRating = BigDecimal.ZERO;

    @ManyToMany
    @JoinTable(
            name = "submission_categories",
            joinColumns = @JoinColumn(name = "submission_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )

    private List<Category> categories = new ArrayList<>();


    // Constructors

    public Submission() {
    }

    public Submission(@NotNull User user, @NotNull String locationName, @NotNull String locationAddress, @NotNull String placeId, @NotNull int rating, @NotNull String description, @NotNull String submissionReview, List<Category> categories) {
        this.user = user;
        this.locationName = locationName;
        this.locationAddress = locationAddress;
        this.placeId = placeId;
        this.rating = rating;
        this.description = description;
        this.submissionReview = submissionReview;
        this.submissionDate = LocalDateTime.now();
        this.categories = categories;
    }

    // Getters and Setters

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

    public String getLocationName() {
        return locationName;
    }

    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSubmissionReview() {
        return submissionReview;
    }

    public void setSubmissionReview(String submissionReview) {
        this.submissionReview = submissionReview;
    }

    public LocalDateTime getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(LocalDateTime submissionDate) {
        this.submissionDate = submissionDate;
    }

    public BigDecimal getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(BigDecimal averageRating) {
        this.averageRating = averageRating;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Submission that = (Submission) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Submission{" +
                "id=" + id +
                ", user=" + user +
                ", locationName='" + locationName + '\'' +
                ", locationAddress='" + locationAddress + '\'' +
                ", placeId='" + placeId + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", submissionReview='" + submissionReview + '\'' +
                ", submissionDate=" + submissionDate +
                ", averageRating=" + averageRating +
                ", categories=" + categories +
                '}';
    }
}
