package com.CherrySystems.ThirdPlace_Backend.models.dto;



public class SubmissionFormDTO {


    private String locationName;

    private String locationAddress;

    private Integer rating;

    private String description;

    private String submissionReview;

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
}
