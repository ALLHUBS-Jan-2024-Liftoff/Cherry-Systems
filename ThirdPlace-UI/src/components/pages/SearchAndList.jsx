import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../navigation/Navbar";
import CondensedSubmission from "../condensed-submission/CondensedSubmission.jsx";

export default function SearchAndList() {
  const [submissions, setSubmissions] = useState([]);
  const [resultRecords, setResultRecords] = useState([]);
  const [autocompleteSuggestions, setautocompleteSuggestions] = useState([]);
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

  // handleChange function triggers with each change in selection or input

  const handleChange = (value, filter) => {

    setInput(value);
    setFilter(filter);

    // Filter autocomplete suggestions with each input change

    if (value === "") {
      setautocompleteSuggestions([]);
    } else if (filter === "all") {
      setautocompleteSuggestions(
        submissions
          .filter(function (submission) {
            return (
              submission.locationName
                .toLowerCase()
                .includes(value.toLowerCase()) ||
              submission.locationAddress
                .toLowerCase()
                .includes(value.toLowerCase())
            );
          })
          .slice(0, 4)
      );
    } else if (filter === "name") {
      setautocompleteSuggestions(
        submissions
          .filter(function (submission) {
            return submission.locationName
              .toLowerCase()
              .includes(value.toLowerCase());
          })
          .slice(0, 4)
      );
    } else if (filter === "address") {
      setautocompleteSuggestions(
        submissions
          .filter(function (submission) {
            return submission.locationAddress
              .toLowerCase()
              .includes(value.toLowerCase());
          })
          .slice(0, 4)
      );
    }

    // Filter listed submissions with each input change

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

  // Handles a click selection of an autocomplete suggestion

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleChange(suggestion, filter);
    setautocompleteSuggestions([]);
  };

  // Handles rendering of autocomplete suggestions based on filter

  function renderAutoCompleteValue(suggestion) {

    let autocompleteValue = "";

    if (filter === "all") {

      if (suggestion.locationName.toLowerCase().includes(input.toLowerCase())) {
        autocompleteValue = suggestion.locationName;
      } else if (
        suggestion.locationAddress.toLowerCase().includes(input.toLowerCase())
      ) {
        autocompleteValue = suggestion.locationAddress;
      } else autocompleteValue = "Error: Cannot render value";

    } else if (filter === "name") {
      autocompleteValue = suggestion.locationName;

    } else if (filter === "address") {
      autocompleteValue = suggestion.locationAddress;
    }

    return autocompleteValue;

  }

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
            autocomplete="off"
            name="searchQuery"
            value={input}
            onChange={(event) => handleChange(event.target.value, filter)}
            placeholder="Type to search..."
          />

          <div className="dropdown">
            {autocompleteSuggestions.map((suggestion) => (
              <div
                className="dropdown-row"
                key={suggestion.id}
                onClick={(event) => {
                  handleSuggestionClick(
                    filter === "all"
                      ? suggestion.locationName || suggestion.locationAddress
                      : filter === "name"
                      ? suggestion.locationName
                      : suggestion.locationAddress
                  );
                  event.stopPropagation();
                }}
              >
                {renderAutoCompleteValue(suggestion)}
              </div>
            ))}
          </div>
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