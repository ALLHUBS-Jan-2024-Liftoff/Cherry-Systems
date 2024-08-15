import axios from "axios";
import react from 'react';

// import { useState } from "react";



//  Load all submissions  //

export const fetchSubmissions = async () => {
    try {
        const response = await axios
        .get('http://localhost:8080/api/submission/all');
        return response.data;
    } catch (error) {
        console.error("Unable to fetch submissions");
        throw error;
    }
    // setSubmissionList(result.data);
    // console.log(submissionList);
};
// console.log(submissionList);



//  Add new submission  //

export const addSubmission = async (locationName, locationAddress, description) => {
   const submissonData = {
    locationName, 
    locationAddress, 
    description,
    rating: 4,
    submissionReview: 'This place has awesome coffee!'
   };
   
    try {
        const {response} = await axios
        .post(`http://localhost:8080/api/submission/submitlocation`, submissonData, { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
        console.log(addSubmission.data);
        alert("Submission added successfully!");
        return response.data;
    } catch(error) {
        console.error("Unable to save submission.", error);
        alert("Unable to save new submission.", error);
    }
};



// //  Delete user Submission  //

export const deleteSubmission = async (submissionId) => {
    try {
        await axios
        .delete(`http://localhost:8080/api/submission/${submissionId}`, null, {
            params: { submissionId },
        })
    } catch(error) {
        console.error("We are unable to delete your submission.", error);
        throw error;
    }
};