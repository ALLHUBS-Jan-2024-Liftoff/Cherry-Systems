import React, { useEffect, useState } from 'react'
import RateAndReview from './RateAndReview'
import { fetchSubmissions, addSubmission } from '../../service/SubmissionService';
import { CategoryMenu } from './CategoryMenu';
import { useNavigate } from 'react-router-dom';
import AddressBar from '../Map/AddressBar';
import { Link } from 'react-router-dom';


const SubmissionForm = () => {

    const [address, setAddress] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [submissionName, setSubmissionName] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState(4);
    const [submissionReview, setSubmissionReview] = useState("This place has awesome coffee!");
    const [selectedCategories, setSelectedCategories] = useState({});
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    
    const [submissionList, setSubmissionList] = useState([]);
   
    // fetches an array of submission objects from database each time the form is initialized//
    useEffect(() => {
        fetchSubmissions()
            .then(setSubmissionList)
            .catch((error) => {
                console.error("Unable to fetch all submissions.", error);
            });
    }, []);

    // Filter out true categories ids from selectedCategories, then set to categories
    useEffect(() => {
        let categoryIds = [];

        const pickBy = (selectedCategories, fn) =>
            Object.fromEntries(Object.entries(selectedCategories).filter(([k, v]) => fn(v, k)));

        categoryIds = Object.keys(pickBy(selectedCategories, x => x === true));

        setCategories(categoryIds);
    }, [selectedCategories]);

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
                alert("Location already exists in ThirdPlace.");
                navigate('../'+submissionName, {replace: true});
                window.location.reload();
                return;
            }
            return true;
        };


        // if form has no empty fields and location isn't in database, add new submission, alert user submission created, and reload SubmitLocation page
        if (submissionName !== "" && address !== "" && description !== "" && validLocation(submissionName)) {
            addSubmission(submissionName, address, placeId, description, categories);
            alert("Submission successfully created!");
            navigate('../'+submissionName, {replace: true});
        } 

    } 

    // console.log(`Location Name: ${submissionName} Prop address: ${address} Prop placeId: ${placeId}`);

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
                    <CategoryMenu selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                <br></br>
                <div>
                    {/* <RateAndReview /> */}
                </div>
                {/* to={`/${submissionName}`}  */}
               
                {/* <Link type="submit" className="submit-button" to={`/${submissionName}`}>Submit Location</Link> */}

                <button type="submit" className="submit-button">Submit Location</button>

            </form>
        </>
    );
}

export default SubmissionForm;
