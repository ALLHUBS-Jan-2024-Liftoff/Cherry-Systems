import React from 'react'
import Navbar from "../navigation/Navbar";
import CondensedSubmission from "../condensed-submission/CondensedSubmission";

export default function Home() {
    
    let condensedLocationInfo = [
        {
            "id": 2,
            "location_name": "City Museum",
            "location_address": "750 N 16th St, St. Louis, MO 63103, USA"
        }
    ];


  return (
    <>
    <Navbar/>
 
      <h1>View Locations</h1>

      <CondensedSubmission props={condensedLocationInfo[0]}/>
      <CondensedSubmission props={condensedLocationInfo[0]}/>
      <CondensedSubmission props={condensedLocationInfo[0]}/>
      
    </>
  )
}
