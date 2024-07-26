import React from 'react'
import Navbar from "../navigation/Navbar";
import Minimap from "../Map/Minimap";

export default function Map() {

  let placeId = {placeId: "ChIJh25wB-7_dYgR_PxH5m5ScMA"};
  
  return (
    <>

    <Navbar/>

    {/* This page is a sample for development purposes only, located at http://localhost:5173/map */}
 
      <h1>Sample Map</h1>
      
        <Minimap placeId={placeId}/>

      <p className="gray-text">
      Map display
      </p>

    </>
  )
}
