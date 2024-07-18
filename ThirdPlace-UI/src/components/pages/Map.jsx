import React from 'react'
import Navbar from "../navigation/Navbar";
import MapDisplay from "../../MapDisplay"

export default function Map() {
  return (
    <>

    <Navbar/>

    {/* This page is a sample for development purposes only, located at http://localhost:5173/map */}
 
      <h1>Sample Map</h1>
      
      <MapDisplay />
      
      <p className="gray-text">
      Map display
      </p>

    </>
  )
}
