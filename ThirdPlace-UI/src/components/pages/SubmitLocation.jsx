import React from "react";
import Navbar from "../navigation/Navbar";
import SubmissionForm from "../submission/SubmissionForm";

export default function SubmitLocation() {
    return( 
        <>
            <Navbar />

            <h1>Submit A New Location</h1>

            <div className="container review-card">
                <SubmissionForm />
            </div>


            <p className="gray-text">
                <center>🍒 Powered by Cherry Systems</center>
            </p>
        </>
    )
}