import React from 'react';
import Navbar from '../navigation/Navbar';

export default function SearchAndList() {
  return (
    <div>
        <Navbar/>

        <h1>Search and Listings Page</h1>

        <div className='review-card'>
            <h3>Listings</h3>
            <p></p>
        </div>
        <div className='review-card'>
            <h3></h3>
            <p></p>
        </div>
        <div className='review-card'>
            <h3></h3>
            <p></p>
        </div>
        <p className="gray-text">
        <center>🍒 Powered by Cherry Systems </center>
      </p>

    </div>
  )
}