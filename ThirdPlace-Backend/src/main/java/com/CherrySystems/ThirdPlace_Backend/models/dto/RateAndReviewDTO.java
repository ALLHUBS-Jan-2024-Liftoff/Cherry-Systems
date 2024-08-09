package com.CherrySystems.ThirdPlace_Backend.models.dto;

public class RateAndReviewDTO {

    private int rating;

    private String reviewText;

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
}
