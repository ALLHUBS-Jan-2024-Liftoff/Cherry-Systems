import React from 'react'
import Navbar from "../navigation/Navbar";
import PlaceIdMap from "../../PlaceIdMap";
import FormattedAddress from "../../FormattedAddress"

export default function Map() {
  return (
    <>

    <Navbar/>

    {/* This page is a sample for development purposes only, located at http://localhost:5173/map */}
 
      <h1>Sample Map</h1>
      
      {/* Hardcoded map */}
      {/* <MapDisplay /> */}
      
        <PlaceIdMap />


        {/* Formatted address for readability */}
        {/* <FormattedAddress/> */}

      <p className="gray-text">
      Map display
      </p>

    </>
  )
}
