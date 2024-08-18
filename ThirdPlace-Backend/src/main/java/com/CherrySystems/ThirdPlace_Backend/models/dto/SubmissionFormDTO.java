package com.CherrySystems.ThirdPlace_Backend.models.dto;


import com.CherrySystems.ThirdPlace_Backend.models.Category;

import java.util.List;

public class SubmissionFormDTO {


    private String locationName;

    private String locationAddress;

    private String placeId;

    private Integer rating;

    private String description;

    private String submissionReview;

    private List<Integer> categories;

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

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
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

    public List<Integer> getCategories() {
        return categories;
    }

    public void setCategories(List<Integer> categories) {
        this.categories = categories;
    }
}
