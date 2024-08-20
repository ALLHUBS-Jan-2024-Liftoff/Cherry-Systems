import React, { useEffect, useState } from 'react'
import RateAndReview from './RateAndReview'
import { fetchSubmissions, editSubmission } from '../../service/SubmissionService';
import { CategoryMenu } from './CategoryMenu';
import { useNavigate } from 'react-router-dom';
import AddressBar from '../Map/AddressBar';
import Submission from '../pages/Submission';

const UpdateSubmissionForm = (props) => {

    let data = props;

    // TODO: UPDATE CATEGORIES
    // console.log(data.props);
    // let catArr = data.props.categories;
    // let something = [];
    // for(let i = 0; i < catArr.length; i++) {
    //     something.push(catArr[i].id);
    // }

    // const keyValuePairCategories = catArr.reduce((obj, category) => (
    //     {...obj, [ category.id ]: true}
    // ), {});


    // console.log(keyValuePairCategories);

    const [editMode, setEditMode] = useState(true);

    const [address, setAddress] = useState("");
    const [placeId, setPlaceId] = useState("");
    const [submissionName, setSubmissionName] = useState(data.props.locationName);
    const [description, setDescription] = useState(data.props.description);
    const [rating, setRating] = useState(data.props.rating);
    const [submissionReview, setSubmissionReview] = useState(data.props.submissionReview);
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



    // on form submission // 
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        // checks to see if submitting location name is in database // 
        const locationNameExists = submissionList.find(({locationName}) => locationName === submissionName);

        // validates the location name, alerting users if location is already in database; If location exists, prevent form from submitting; else return true validation // 
        const validLocation = () => {
            // old location does not match new location AND new location is in database
            if ((data.props.locationName !== submissionName) && (locationNameExists.locationName === submissionName)) {
                alert("Submission not updated, location already exists in ThirdPlace. ");
                navigate('../'+submissionName, {replace: true});
                window.location.reload();
                return;
            }
            return true;
        };

        // Checks if there is a place ID, blocks submission if not
        if (!placeId) {
            alert("Please select a valid address from the drop down menu.");
            e.preventDefault();
        } else {
        // if form has no empty fields and location isn't in database, edit submission, alert user submission updated, and reload SubmitLocation page
        if (submissionName !== "" && address !== "" && description !== "" && validLocation(submissionName)) {
            await editSubmission(data.props.id, submissionName, address, placeId, description, rating, submissionReview, categories);
            alert("Submission successfully updated!");
            setEditMode(false);
            navigate('../'+submissionName, {replace: true});
        } 
    }
}

    return (
        <>
        {editMode ? (
            <form
            onSubmit={handleSubmit}
            >
                <div className="form-group">
                    <label>Location Name: <br></br>
                        <input 
                        type="text" 
                        name="submissionName" 
                        // placeholder='Write location name...'
                        value={submissionName} 
                        onChange={(e) => setSubmissionName(e.target.value)} 
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <AddressBar address={address} setAddress={setAddress} placeId={placeId} setPlaceId={setPlaceId} />
                </div>
                <div className="form-group">
                    <label>Description: <br></br>
                        <textarea 
                        type="text" 
                        rows="4"
                        name="description" 
                        // placeholder='Write a description...'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        required/>
                    </label>
                </div>
                    <CategoryMenu selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                <br></br>
                <div>
                    <RateAndReview rating={rating} setRating={setRating} submissionReview={submissionReview} setSubmissionReview={setSubmissionReview}/>
                </div>
                
                <button type="submit" className="submit-button">Submit Location</button>

            </form>
            ) : (
                <Submission />
            )}
        </>
    );
}

export default UpdateSubmissionForm;