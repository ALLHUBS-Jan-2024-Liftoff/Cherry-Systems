import React, { useEffect } from "react";
import Navbar from "../navigation/Navbar";
import SubmissionForm from "../submission/SubmissionForm";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SubmitLocation() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     if (user === null) {
    //         navigate('/login', { user, isAuthenticated });
    //         console.log("Must be logged in to submit a location.");
    //     }
    // }, [])

    return( 
        <>
            <Navbar />
            {user === null ? (
            <section className='review-card'>
                <h1>Log in to submit a location!</h1>
                <br />
                <p>
                    <Link to={{ pathname: '/login', state: { user, isAuthenticated }}}>Go to Login</Link>
                </p>
            </section>
            ) : (
            <section>
                <h1>Submit A New Location</h1>

                <div className="container review-card">
                    <SubmissionForm />
                </div>
            </section>
            )}

            <p className="gray-text">
                <center>🍒 Powered by Cherry Systems</center>
            </p>
        </>
    )
}