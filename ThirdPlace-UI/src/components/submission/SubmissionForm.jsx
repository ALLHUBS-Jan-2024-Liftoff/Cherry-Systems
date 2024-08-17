import React, { useEffect, useState } from 'react'
import RateAndReview from './RateAndReview'
import { fetchSubmissions, addSubmission } from '../../service/SubmissionService';
import { CategoryMenu } from './CategoryMenu';
// import { useNavigate } from 'react-router-dom';
import AddressBar from '../Map/AddressBar';


const SubmissionForm = () => {

    const [address, setAddress] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [submissionName, setSubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(4);
    const [submissionReview, setSubmissionReview] = useState("This place has awesome coffee!");
    const [categories, setCategories] = useState("");

    const [submissionList, setSubmissionList] = useState([]);

    // Previous data state

    // const [submissionData, setSubmissionData] = useState({
    //     locationName: '',
    //     locationAddress: '',
    //     description: '',
    //     rating: 4, 
    //     submissionReview: 'This place has awesome coffee!', 
    //     categories: []
    // });

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
    // const handleChange = (e) => {
        // setSubmissionData({...submissionData, [e.target.name]: e.target.value });
    // };
                   
    
    // on form submission // 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
             
        // checks to see if submitting location name is in database // 
        const locationNameExists = submissionList.find(({locationName}) => locationName === submissionName);

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
        if (submissionName !== "" && address !== "" && description !== "" && validLocation(submissionName)) {
            addSubmission(submissionName, address, description);
            alert("Submission successfully created!");
            window.location.reload();
            //TODO: reroute page to submission page by submissionID navigate('/submission')
        } 

    } 

    // console.log(`Location name: ${submissionData.locationName} Location Address: ${submissionData.locationAddress} Prop address: ${address} Prop placeId: ${placeId}`);

    return (
        <>
            <form
            onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>Location Name: <br></br>
                        <input 
                        type="text" 
                        name="submissionName" 
                        value={submissionName} 
                        onChange={(e) => setSubmissionName(e.target.value)} 
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    {/* <label>Address: <br></br>
                        <input 
                        type="text" 
                        name="locationAddress"
                        value={submissionData.locationAddress} 
                        onChange={handleChange} 
                        required
                        />
                    </label> */}
                    <AddressBar address={address} setAddress={setAddress} placeId={placeId} setPlaceId={setPlaceId} />
                </div>
                <div className="form-group">
                    <label>Description: <br></br>
                        <textarea 
                        type="text" 
                        rows="4"
                        name="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
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
