package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name = "username")
    private String username;

    @NotNull
    @Column(name = "pw_hash")
    private String pwHash;

    @NotNull
    @Column(name = "email")
    private String email;

    public User() {
    }

    // Constructors

    public User(@NotNull String username, @NotNull String pwHash, @NotNull String email) {
        this.username = username;
        this.pwHash = pwHash;
        this.email = email;
    }

    public User(String username, String password) {
        this.username = username;
        this.pwHash = password;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public String getEmail() { return email; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

    public void setEmail(String email) { this.email = email; }

        @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
