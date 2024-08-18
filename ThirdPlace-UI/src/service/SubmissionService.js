import axios from "axios";



//  Load all submissions  //

export const fetchSubmissions = async () => {
    try {
        const response = await axios
        .get('http://localhost:8080/api/submission/all')
        return response.data;
    } catch (error) {
        console.error("Unable to fetch all submissions.");
        throw error;
    }

};


//  Load submissions by Location Name  //

// export const fetchSubmissionByLocationName = async () => {
//     try {
//         const response = await axios
//         .get('http://localhost:8080/api/submission/{id}')
//         return response.data;
//     } catch (error) {
//         console.error("Unable to fetch submission by that location.")
//     }
// }





//  Add new submission  //

<<<<<<< HEAD
export const addSubmission = async (locationName, locationAddress, description, rating, submissionReview, categories) => {
=======
export const addSubmission = async (locationName, locationAddress, placeId, description, categories) => {
>>>>>>> main
   const submissonData = {
    locationName, 
    locationAddress, 
    placeId,
    description,
    rating,
    submissionReview,
    categories
   };
   
    try {
        const {response} = await axios
        .post(`http://localhost:8080/api/submission/submitlocation`, submissonData, { 
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
        return response.data;
    } catch(error) {
        console.error("Unable to save submission.", error);
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