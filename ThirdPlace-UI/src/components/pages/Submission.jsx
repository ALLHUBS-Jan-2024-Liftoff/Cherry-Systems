import React from 'react';
import Navbar from '../navigation/Navbar';

export default function Submission() {
  return (
    <div>
        <Navbar/>

        <h1>Submission Page</h1>

        <div className='review-card'>
            <h3>Location Name</h3>
            <p>Location Address here</p>
        </div>
        <div className='review-card'>
            <h3>First Review here</h3>
            <p>Review and Rating</p>
        </div>
        <div className='review-card'>
            <h3>Additional User Reviews</h3>
            <p>The deets</p>
        </div>
        <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>

    </div>
  )
}
