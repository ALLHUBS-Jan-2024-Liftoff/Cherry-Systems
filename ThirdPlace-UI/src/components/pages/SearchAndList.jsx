import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import CondensedSubmission from "../condensed-submission/CondensedSubmission.jsx";

export default function SearchAndList() {

  const [submissions, setSubmissions] = useState([]);

  // https://www.youtube.com/watch?v=xAqCEBFGdYk
  // https://www.youtube.com/watch?v=sWVgMcz8Q44
  // https://www.youtube.com/watch?v=KRJvlxhLXxk

  const [input, setInput] = useState("");
  console.log("printing input:");
  console.log(input);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const result = await axios
      .get("http://localhost:8080/api/submission/searchandlist")
      .catch((error) => {
        console.error("Error fetching data");
      });
    setSubmissions(result.data);
  };
  console.log("printing submissions value onload:");
  console.log(submissions);

  const [resultRecords, setResultRecords] = useState([]);

  const handleChange = (value) => {
    setInput(value);

    setResultRecords(
      submissions.filter(function (value) {
        return (
          value.locationName.toLowerCase().includes(input.toLowerCase()) 
          &&
          value.locationAddress.toLowerCase().includes(input.toLowerCase())
        );
      })
    );
    console.log("resultRecords");
    console.log(resultRecords);
  };

  return (
    <div>
      <Navbar />

      <h1>View Locations</h1>

      <form method="post">
        <div className="form-group">
          <h5>Search by:</h5>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="searchAll"
                value="all"
              />
              <span> All</span>
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="searchByName"
                value="name"
                disabled
              />
              <span> Name</span>
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="searchByAddress"
                value="address"
                disabled
              />
              <span> Address</span>
            </label>
          </div>

          <input
            className="form-control"
            type="text"
            name="searchQuery"
            value={input}
            onChange={(event) => handleChange(event.target.value)}
          />
        </div>

        <input type="submit" className="submit-button" value="Search" />
      </form>

      <table className="table table-striped border shadow">
        <tbody>
          {resultRecords.map((submission) => (
            <tr key={submission.id}>
              <CondensedSubmission props={submission} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
