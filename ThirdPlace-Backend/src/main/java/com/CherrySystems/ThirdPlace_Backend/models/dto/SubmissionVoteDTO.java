package com.CherrySystems.ThirdPlace_Backend.models.dto;

import com.CherrySystems.ThirdPlace_Backend.models.Submission;
import com.CherrySystems.ThirdPlace_Backend.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

public class SubmissionVoteDTO {

    private Integer submissionId;

    private String voteType;

    public Integer getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(Integer submissionId) {
        this.submissionId = submissionId;
    }

    public String getVoteType() {
        return voteType;
    }

    public void setVoteType(String voteType) {
        this.voteType = voteType;
    }
}
