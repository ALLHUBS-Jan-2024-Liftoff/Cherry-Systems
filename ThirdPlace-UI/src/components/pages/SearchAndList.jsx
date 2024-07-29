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
