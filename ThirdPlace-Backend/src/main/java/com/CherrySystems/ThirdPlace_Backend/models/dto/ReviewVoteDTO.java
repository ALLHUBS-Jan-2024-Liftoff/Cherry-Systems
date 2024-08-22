package com.CherrySystems.ThirdPlace_Backend.models.dto;

import com.CherrySystems.ThirdPlace_Backend.models.Review;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

public class ReviewVoteDTO {

    @NotNull
    @ManyToOne
    private Integer reviewId;

    @NotNull
    private String voteType;

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public String getVoteType() {
        return voteType;
    }

    public void setVoteType(String voteType) {
        this.voteType = voteType;
    }
}
