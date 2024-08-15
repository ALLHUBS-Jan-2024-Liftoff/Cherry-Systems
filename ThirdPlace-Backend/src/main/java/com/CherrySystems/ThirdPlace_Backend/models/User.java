package com.CherrySystems.ThirdPlace_Backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
    @Email
    @Column(name = "email", unique=true)
    private String email;

    @NotNull
    @Column(name = "pw_hash")
    private String pwHash;

    @Column(name = "cherry_points", columnDefinition = "INT DEFAULT 0")
    private int cherryPoints;

    @Column(name = "profile_image")
    private Integer profileImage;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User() {
    }

    // Constructors
    public User(@NotNull String username, @NotNull String email, @NotNull String password, Integer profileImage) {
        this.username = username;
        this.email = email;
        this.pwHash = encoder.encode(password);
        this.cherryPoints = 0;
        this.profileImage = profileImage;
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

    public Integer getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(Integer profileImage) {
        this.profileImage = profileImage;
    }


    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
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
