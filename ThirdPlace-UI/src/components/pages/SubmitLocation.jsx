import React, { useState, useEffect } from "react";
import Navbar from "../navigation/Navbar";
import SubmissionForm from "../submission/SubmissionForm";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchSubmissions, deleteSubmission } from "../../service/SubmissionService";

export default function SubmitLocation() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [submission, setSubmission] = useState([]);
    // const [locationName, setLocationName] = useState("");
    // const [locationAddress, setLocationAddress] = useState("");
    // const [description, setDescription] = useState("");
    
    // useEffect(() => {
    //     if (user === null) {
    //         navigate('/login', { user, isAuthenticated });
    //         console.log("Must be logged in to submit a location.");
    //     }
    // }, [])

    useEffect(() => {
        fetchSubmissions()
        .then(setSubmission)
        .catch((error) => {
            console.error("There was an error fetching all submissions.", error);
        });
    }, []);

    // const processAddSubmission = (locationName, locationAddress, description) => {
    //     addSubmission(locationName, locationAddress, description)
    //         .then((newSubmission) => {
    //             setSubmission([...submission, newSubmission]);
    //         })
    //         .catch((error) => {
    //             console.error("There was an issue creating new submission.", error);
    //         });
    // };

    return ( 
        <>
            <Navbar />
            {user === null ? (
            <div className="update-submission-form-padding">
            <section className='review-card-no-user-profile-submit-location'>
                <h1>Log in to submit a location!</h1>
                <br />
                <p>
                    <Link className="link-css-login-register" to={{ pathname: '/login', state: { user, isAuthenticated }}}>Go to Login</Link>
                </p>
            </section>
            </div>
            ) : (
            <section  className="submit-location-div">
                <div className="submit-location-title">
                    <h1>Submit A New Location</h1>
                </div>

                <div className="container review-card-new-submission">
                    <SubmissionForm />
                </div>
                <p className="gray-text-new-submission">
                    <span>🍒 Powered by Cherry Systems</span>
                </p>
            </section>
            )}

        </>
    )
}