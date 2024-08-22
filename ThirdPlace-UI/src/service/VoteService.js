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
    console.log(`Value of ${voteType} in setSubmission`);
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
        console.error("Error adding new Submission vote", error);
    }
}

export const setReviewVotes = async (reviewId, voteType) => {
    try {
        await axios.post('http://localhost:8080/api/votes/reviewvotes/new', {
            reviewId, 
            voteType
        },
            {headers: { 'Content-Type': 'application/json' },
            withCredentials: true}
    ).then(function (response) {
        console.log(response);
    })
    } catch (error) {
        console.error("Error adding new Review vote", error);
    }
}