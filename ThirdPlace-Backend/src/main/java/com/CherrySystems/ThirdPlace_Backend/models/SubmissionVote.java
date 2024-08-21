package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "submission_vote")
public class SubmissionVote {
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
    @Column(name = "vote_type", columnDefinition = "ENUM('up', 'down')")
    private String voteType;

    //Constructors


    public SubmissionVote() {
    }

    public SubmissionVote(int id, Submission submission, User user, String voteType) {
        this.submission = submission;
        this.user = user;
        this.voteType = voteType;
    }

    //Getters and Setters

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

    public String getVoteType() {
        return voteType;
    }

    public void setVoteType(String voteType) {
        this.voteType = voteType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubmissionVote that = (SubmissionVote) o;
        return id == that.id && Objects.equals(submission, that.submission) && Objects.equals(user, that.user) && Objects.equals(voteType, that.voteType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, submission, user, voteType);
    }

    @Override
    public String toString() {
        return "SubmissionVote{" +
                "id=" + id +
                ", submission=" + submission +
                ", user=" + user +
                ", voteType='" + voteType + '\'' +
                '}';
    }
}
