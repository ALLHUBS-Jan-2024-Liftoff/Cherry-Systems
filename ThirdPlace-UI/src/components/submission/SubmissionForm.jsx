
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RateAndReview from './RateAndReview'
import { CategoryMenu } from './CategoryMenu'

import { addSubmission } from '../../service/SubmissionService';
import axios from 'axios';




const SubmissionForm = () => {
    // const [submissionList, setSubmissionList] = useState([]);
    const [submissionData, setSubmissionData] = useState({
        locationName: '',
        locationAddress: '',
        description: '',
        rating: 4, 
        submissionReview: 'This place has awesome coffee!'
    });
    // const [locationName, setLocationName] = useState("");
    // const [locationAddress, setLocationAddress] = useState("");
    // const [description, setDescription] = useState("");

    // useEffect(() => {
    //     fetchSubmissions()
    //         .then(setSubmissionList)
    //         .catch((error) => {
    //             console.error("Unable to fetch all submissions.", error);
    //         });
    // }, []);
    // console.log(submissionList);


    const handleChange = (e) => {
        setSubmissionData({...submissionData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (submissionData.locationName !== "" && submissionData.locationAddress !== "" && submissionData.description !== "") {
            addSubmission(submissionData.locationName, submissionData.locationAddress, submissionData.description); 
            alert("Submission successfully created!")
        } else {
            alert("Submission was not created. Please complete the form.")
        }
            
        // const form = document.getElementById('submission-form');
        // const formData = new FormData(form);
       
    
        // try {
        //     const response = await axios
        //     .post("http://localhost:8080/api/submission/submitlocation", submissionData, {
        //         headers: { 'Content-Type': 'application/json'}
        //     })
        //     console.log(response.data);
        //     return response.data
        //     // alert("Submission: " + response.data);
        // } catch (error) {
        //     console.error("Unable to save submission.", error);
        //     alert("Unable to save new submission.", error);
        // }



        // const config = {
        //     headers: {
        //         'Accept':'application/javascript',
        //     }
        // }
    }

    // document.getElementById('submission-form').addEventListener('submit', handleSubmit)

        // if (locationName !== "" && locationAddress !== "" && description !== "") {
        //     addSubmission(locationName, locationAddress, description); 
        //     setLocationName("");
        //     setLocationAddress("");
        //     setDescription(""); 
        // }
        // alert("Submission successfully submitted with: " + locationName + ", " + locationAddress + ", " + description);
            // navigate('/submission');
            // navigate(`/submission/${submissionId}`, {submissionId})
    // };
   

    return (
        <>
            <form
            id="submission-form"
            action="http://localhost:8080/api/submission/submitlocation"
            method="POST"
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

    // const form = document.getElementById('form')
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();

    //     const formData = new FormData(form);

    //     console.log([...formData]);
    // });
    
    // const [submission, setSubmission] = useState({
    //     locationName: '',
    //     locationAddress: '',
    //     description: ''
    // })

    // const handleInput = (e) => {
    //     setSubmission({...submission, [e.target.name]: e.target.value})
    // }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     axios.post('/submission/new', {submission})
    //     .then(response => console.log(response))
    //     .catch(error => console.log(error))
    // }

    // const { submissionId } = useParams;

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const validLocation = (locationName, locationAddress) => {
    //         if (locationNameExists(locationName)) {
    //             e.preventDefault();
    //             return false;
    //         }

    //         if (locationAddressExists(locationAddress)) {
    //             e.preventDefault();
    //             return false;
    //         }

    //         else {
    //             return true;
    //         }
    //     }


    //     if (locationName !== "" && locationAddress !== "" && description !== "" && validLocation(locationName, locationAddress)) {
    //         setError("");
    //         newSubmission(locationName, locationAddress, description); 
    //         alert("Submission successfully submitted!");
    //         // navigate(`/submission/${submissionId}`, {submissionId})
    //     }
    // };

     // const validLocation = (locationName, locationAddress) => {
        //     if (locationNameExists(locationName)) {
        //         e.preventDefault();
        //         return false;
        //     }
        
        //     if (locationAddressExists(locationAddress)) {
        //         e.preventDefault();
        //         return false;
        //     } 
            
        //     else {
        //         return true;
        //     }
        // }

        // console.log(validLocation);
        // && validLocation(locationName, locationAddress
        
        // if (locationName !== "" && locationAddress !== "" && description !== "" ) {
        //     setError("");

        // const [submissionList, setSubmissionList] = useState([]);
    
    // const [Data, setData] = useState({locationName: "", locationAddress: "", description: "", rating: 4, reviewText: "Great coffee"});
    // const [locationName, setLocationName] = useState("");
    // const [locationAddress, setLocationAddress] = useState("");
    // const [description, setDescription] = useState("");
    // const [rating, setRating] = useState(""); 
    // const [reviewText, setReviewText] = useState("");

    // const [newSubmission, setNewSubmission] = useState([]);

    // const navigate = useNavigate();


    //  Load all submissions  //

    // useEffect(() => {
    //     fetchSubmissions()
    //         // .then(setSubmissionList)
    //         // .catch((error) => {
    //         //     console.error("Unable to fetch all submissions.", error);
    //         // });
    // }, []);
    // console.log(submissionList);

    
    // Load all submissions  //
    
//     const fetchSubmissions = async () => {
//         try {
//             const result = await axios
//             .get('http://localhost:8080/api/submission/all');
//             // return result.data;
//         } catch(error) {
//             console.error("Unable to fetch submissions");
//             throw error;
//         }
//         setSubmissionList(result.data);
//         console.log(submissionList); 
//     };
// console.log(submissionList);

    // const addSubmission = async (locationName, locationAddress, description) => {
    //     try {
    //         const addSubmission = await axios
    //         .post(`http://localhost:8080/api/submission/submitlocation`, Data, {
    //             params: { locationName, locationAddress, description },
    //         });
    //         // console.log(addSubmission.data);
    //         // setNewSubmission(addSubmission.Data);
    //         return addSubmission.data;
    //     } catch(error) {
    //         console.error("Unable to save submission.", error);
    //         throw error;
    //     }
    // };
    

    // const handleChange = (e) => {
    //     const value = e.target.value;
    //     setData({
    //         ...Data, 
    //         [e.target.name]: value
    //     });
    // };

    // const locationNameExists = (Data.locationName) => {
    //     submissionList.forEach(row => {
    //         console.log(submissionList);
    //         if (row.locationName === Data.locationName) {
    //             alert("Location name already exists."); 
    //             return true;
    //         }
    //     });
    // };

    // const locationAddressExists = (locationAddress) => {
    //     submissionList.forEach(row => {
    //         if (row.locationAddress === locationAddress) {
    //             alert("Location address already exists."); 
    //             return true;
    //         }
    //     });
    // };

   


            // const submissionForm = axios
            //     .post(`http://localhost:8080/api/submission/submitlocation`, {
            //     locationName: formData.locationName,
            //     locationAddress: formData.locationAddress,
            //     description: formData.description, 
            //     rating: formData.rating,
            //     reviewText: formData.reviewText
            //     })
            //     .catch((error) => {
            //         console.error("Unable to submit location.");
            //     });
    
    
// }