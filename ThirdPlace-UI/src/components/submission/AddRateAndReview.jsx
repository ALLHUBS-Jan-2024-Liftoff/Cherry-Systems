import axios from "axios";


export default AddRateAndReview() {


    //  Load reviews by submissionID  //

    useEffect(() => {
        // Fetch reviews
        axios.get(`http://localhost:8080/api/reviews?submissionId=${submissionId}`)
          .then(response => {
            setReviews(response.data);
            setError('');
          })
          .catch(error => {
            setError('Failed to fetch reviews');
            console.error('Error fetching reviews:', error);
          });
        }, [submissionId]);
}