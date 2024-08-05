import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import CondensedSubmission from "../condensed-submission/CondensedSubmission.jsx";

export default function SearchAndList() {
  
  const [submissions, setSubmissions] = useState([]);
  const [resultRecords, setResultRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");

  // Load submission data from back end

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
    setResultRecords(result.data);
  };

  // Filter submissions with each input change

  const handleChange = (value, filter) => {
    
    setInput(value);
    setFilter(filter);

    if (value == "") {
      setResultRecords(submissions);
    } else if (filter === "all") {
      setResultRecords(
        submissions.filter(function (submission) {
          return (
            submission.locationName
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            submission.locationAddress
              .toLowerCase()
              .includes(value.toLowerCase())
          );
        })
      );
    } else if (filter === "name") {
      setResultRecords(
        submissions.filter(function (submission) {
          return submission.locationName
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );
    } else if (filter === "address") {
      setResultRecords(
        submissions.filter(function (submission) {
          return submission.locationAddress
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );
    }
  };

  return (
    <div>
      <Navbar />

      <h1>View Locations</h1>

      <div className="search-form">
        <div className="form-group">
          <h5>Search by:</h5>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="filter"
                value="all"
                id="all"
                checked={filter === "all"}
                onChange={(event) => handleChange(input, event.target.value)}
              />
              <label htmlFor="all"> All</label>
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="filter"
                value="name"
                id="name"
                checked={filter === "name"}
                onChange={(event) => handleChange(input, event.target.value)}
              />
              <label htmlFor="name"> Name</label>
            </label>
          </div>

          <div className="form-check form-check-inline">
            <label className="form-check-label">
              <input
                className="form-check-input"
                type="radio"
                name="filter"
                value="address"
                id="address"
                checked={filter === "address"}
                onChange={(event) => handleChange(input, event.target.value)}
              />
              <label htmlFor="address"> Address</label>
            </label>
          </div>

          <input
            className="form-control"
            type="text"
            name="searchQuery"
            value={input}
            onChange={(event) => handleChange(event.target.value, filter)}
            placeholder="Type to search..."
          />
        </div>
      </div>

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