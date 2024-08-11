package com.CherrySystems.ThirdPlace_Backend.models.dto;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;

public class RateAndReviewDTO {

    private int rating;

    private String reviewText;

//    private Submission submission;

    private Integer submissionId;

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

//    public Submission getSubmission() {
//        return submission;
//    }
//
//    public void setSubmission(Submission submission) {
//        this.submission = submission;
//    }

        public Integer getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Integer submissionId) {
        this.submissionId = submissionId;
    }
}
