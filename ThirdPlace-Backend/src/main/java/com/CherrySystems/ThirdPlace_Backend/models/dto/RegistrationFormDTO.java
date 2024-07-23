package com.CherrySystems.ThirdPlace_Backend.models.dto;

public class RegistrationFormDTO extends LoginFormDTO{


    private String verifyPassword;

    private  String verifyEmail;

    public String getVerifyPassword() {
        return verifyPassword;
    }

    public void setVerifyPassword(String verifyPassword) {
        this.verifyPassword = verifyPassword;
    }

    public String getVerifyEmail() {
        return verifyEmail;
    }

    public void setVerifyEmail(String verifyEmail) {
        this.verifyEmail = verifyEmail;
    }
}
