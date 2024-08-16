import React, { useEffect, useState, useRef } from 'react'
import RateAndReview from './RateAndReview'
import { fetchSubmissions, addSubmission } from '../../service/SubmissionService';
import { CategoryMenu } from './CategoryMenu';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';


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
                window.location.reload();
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


// Google Maps Javascript API address bar code

    let autocomplete;
    
    async function initAutoComplete() {

        const {Autocomplete} = await google.maps.importLibrary("places");

        autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        {
            fields: ["name", "place_id", "geometry"]
        }
        );
        //trigger place selection handler
        autocomplete.addListener("place_changed", onPlaceChanged);
    }

    const [address, setAddress] = useState("");
    const [placeId, setPlaceId] = useState("");
    const addressInputRef = useRef(null);

    //TODO write handler for place selection checking if a valid selection is made, and if so, grab placeId
    function onPlaceChanged() {
    const place = autocomplete.getPlace();
    console.log(`place name: ${place.name}`)
    console.log(`place geometry: ${place.geometry}`)
    console.log(`place id: ${place.place_id}`)


    if (!place.geometry) {
        document.getElementById("autocomplete").value = "Enter valid address...";
        console.log("NOT valid address");
        console.log(`place name: ${place.name}`)
        console.log(`inputRef: ${addressInputRef.current.value}`)
    } else {
        // document.getElementById("details").innerHTML = place.name;
        console.log(`valid address found: ${place.name}`);
        setPlaceId(place.place_id);
        setAddress(place.name);

        // state value not initialized
        console.log(`place id and address hook values: ${placeId}, ${address}`);

    }
    }
    console.log(`place id and address hook values outside functions: ${placeId}, ${address}`);

    //TODO: block users from posting form without valid place geometry
    //TODO: save PlaceId as a value for back end

    initAutoComplete();


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
                        id="autocomplete"
                        placeholder="Enter valid address..."
                        ref={addressInputRef}
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
