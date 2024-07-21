package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(name = "username", unique=true)
    private String username;

    @NotNull
    @Column(name = "pw_hash")
    private String pwHash;

    @NotNull
    @Email
    @Column(name = "email", unique=true)
    private String email;

    public User() {
    }

    // Constructors

    public User(@NotNull String username, @NotNull String pwHash, @NotNull String email) {
        this.username = username;
        this.pwHash = pwHash;
        this.email = email;
    }

    // Getters and Setters

    public int getId() {
        return id;
    }

    public String getEmail() { return email; }
    
    public void setEmail(String email) { this.email = email; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

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
