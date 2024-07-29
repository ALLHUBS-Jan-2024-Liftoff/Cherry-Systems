import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import CondensedSubmission from "../condensed-submission/CondensedSubmission.jsx";

export default function SearchAndList() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const result = await axios.get(
      "http://localhost:8080/api/submission/searchandlist"
    );
    setSubmissions(result.data);
  };

  return (
    <div>
      <Navbar />

      <h1>View Locations</h1>

      <form method="post">
        <div className="form-group">
          <h5>Search by:</h5>

          <div className="form-check form-check-inline">

          <input className="form-check-input" type="radio" name="searchAll" value="all"/>
          <label className="form-check-label">
            <span> All</span> 
          </label>
          </div>

          <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="searchByName" value="name" disabled/>
          <label className="form-check-label">
            <span> Name</span> 
          </label>
          </div>

          <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="searchByAddress" value="address" disabled/>
          <label className="form-check-label">
            <span> Address</span> 
          </label>
          </div>

          <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="searchByRating" value="rating" disabled/>
          <label className="form-check-label">
            <span> Rating</span> 
            </label>
            </div>

          <input className="form-control" name="searchQuery" />
          
        </div>

        <input type="submit" className="submit-button" value="Search" />
      </form>

      <table className="table table-striped border shadow">
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <CondensedSubmission props={submission} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
