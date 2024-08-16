import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RateAndReview from './RateAndReview'
import { CategoryMenu } from './CategoryMenu'

import axios from 'axios';

import { fetchSubmissions, addSubmission } from '../../service/SubmissionService';
// import { useNavigate } from 'react-router-dom';





const SubmissionForm = () => {

    const [submissionList, setSubmissionList] = useState([]);
    const [submissionData, setSubmissionData] = useState({
        locationName: '',
        locationAddress: '',
        description: '',
        rating: 4, 
        submissionReview: 'This place has awesome coffee!', 
        categories: []
    });

    // const navigate = useNavigate();
   
    // fetches an array of submission objects from database each time the form is initialized//
    useEffect(() => {
        fetchSubmissions()
            .then(setSubmissionList)
            .catch((error) => {
                console.error("Unable to fetch all submissions.", error);
            });
    }, []);


    // assigns input values to submission form data components // 
    const handleChange = (e) => {
        setSubmissionData({...submissionData, [e.target.name]: e.target.value });
    };
                   
    
    // on form submission // 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
             
        // checks to see if submitting location name is in database // 
        const locationNameExists = submissionList.find(({locationName}) => locationName === submissionData.locationName);

        // validates the location name, alerting users if location is already in database; If location exists, prevent form from submitting; else return true validation // 
        const validLocation = () => {
            if (locationNameExists !== undefined) { 
                alert("Location already exists in ThirdPlace.")
                //TODO: reroute page to submission page by submissionID navigate('/submission')
                e.preventDefault();
                return;
            }
            return true;
        };

        // if form has no empty fields and location isn't in database, add new submission, alert user submission created, and reload SubmitLocation page
        if (submissionData.locationName !== "" && submissionData.locationAddress !== "" && submissionData.description !== "" && validLocation(submissionData.locationName)) {
            addSubmission(submissionData.locationName, submissionData.locationAddress, submissionData.description);
            alert("Submission successfully created!");
            window.location.reload();
            //TODO: reroute page to submission page by submissionID navigate('/submission')
        } 

    } 

    return (
        <>
            <form
            onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>Location Name: <br></br>
                        <input 
                        type="text" 
                        name="locationName" 
                        value={submissionData.locationName} 
                        onChange={handleChange} 
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Address: <br></br>
                        <input 
                        type="text" 
                        name="locationAddress"
                        value={submissionData.locationAddress} 
                        onChange={handleChange} 
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>Description: <br></br>
                        <textarea 
                        type="text" 
                        rows="4"
                        name="description" 
                        value={submissionData.description} 
                        onChange={handleChange} 
                        required/>
                    </label>
                </div>
                <CategoryMenu/>
                <br></br>
                <div>
                    {/* <RateAndReview /> */}
                </div>

                <button type="submit" className="submit-button" >Submit Location</button>
            </form>
        </>
    );
}

export default SubmissionForm;