import React from 'react'
import Navbar from "../navigation/Navbar";
import MapDisplay from "../../MapDisplay"

export default function Home() {
  return (
    <>
    <Navbar/>
 
      <h1>Sample Map</h1>
      
      <MapDisplay />
      
      <p className="gray-text">
      Map display
      </p>

      <div className="review-card">
        This is sample text. </div>
    </>
  )
}
