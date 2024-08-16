import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RateAndReview from './RateAndReview'
import { CategoryMenu } from './CategoryMenu'

import axios from 'axios';

import { fetchSubmissions, addSubmission } from '../../service/SubmissionService';
import { useNavigate } from 'react-router-dom';





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

    // const [submissionId, setSubmissionId] = useState();
    // const navigate = useNavigate();
   
    useEffect(() => {
        fetchSubmissions()
            .then(setSubmissionList)
            .catch((error) => {
                console.error("Unable to fetch all submissions.", error);
            });
    }, []);


    const handleChange = (e) => {
        setSubmissionData({...submissionData, [e.target.name]: e.target.value });
    };
                   
                
    const handleSubmit = async (e) => {
        e.preventDefault(); 
                    
        const locationNameExists = submissionList.find(({locationName}) => locationName === submissionData.locationName);
        const validLocation = () => {
            if (locationNameExists !== undefined) { 
                alert("Location already exists in ThirdPlace.")
                e.preventDefault();
                return;
            }
            return true;
        };

        if (submissionData.locationName !== "" && submissionData.locationAddress !== "" && submissionData.description !== "" && validLocation(submissionData.locationName)) {
            addSubmission(submissionData.locationName, submissionData.locationAddress, submissionData.description);
            alert("Submission successfully created!");
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