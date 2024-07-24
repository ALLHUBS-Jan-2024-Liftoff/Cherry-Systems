package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "review_vote")
public class ReviewVote {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;

        @NotNull
        @ManyToOne
        @JoinColumn(name = "review_id")
        private Review review;

        @NotNull
        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @NotNull
        @Column(name = "vote_type", columnDefinition = "ENUM('up', 'down')")
        private String voteType;

    // Constructors
    public ReviewVote() {
    }

    public ReviewVote(@NotNull Review review, @NotNull User user, @NotNull String voteType) {
        this.review = review;
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

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
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
        ReviewVote that = (ReviewVote) o;
        return id == that.id && Objects.equals(review, that.review) && Objects.equals(user, that.user) && Objects.equals(voteType, that.voteType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, review, user, voteType);
    }
}
