import axios from "axios";

export const fetchSubmissionVotes = async () => {

    try {
        const response = await axios
        .get('http://localhost:8080/api/votes/submissionvotes')
        return response.data;
    } catch (error) {
        console.error(`Unable to fetch submission votes.`, error);
        throw error;
    }
};

export const fetchReviewVotes = async () => {
    try {
        const response = await axios
        .get('http://localhost:8080/api/votes/reviewvotes')
        return response.data;
    } catch (error) {
        console.error(`Unable to fetch review votes.`, error);
        throw error;
    }
};

export const setSubmissionVotes = async (submissionId, voteType) => {
    try {
        await axios.post('http://localhost:8080/api/votes/submissionvotes/new', {
            submissionId, 
            voteType
        },
            {headers: { 'Content-Type': 'application/json' },
             withCredentials: true}
    ).then(function (response) {
          console.log(response);
        })
      } catch (error) {
        console.error("Error adding new vote", error);
      }
}