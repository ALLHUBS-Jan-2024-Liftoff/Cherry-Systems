import axios from "axios";

export const addNewReview = async (submissionId, rating, reviewText) => {
    const reviewData = {
     submissionId,
     rating,
     reviewText
    };
    
     try {
         const response = await axios
         .post('http://localhost:8080/api/reviews/new', reviewData, { 
             headers: { 'Content-Type': 'application/json' },
             withCredentials: true
         }
     );
         return response.data;
     } catch(error) {
         console.error("Unable to save review.", error);
     }
 };