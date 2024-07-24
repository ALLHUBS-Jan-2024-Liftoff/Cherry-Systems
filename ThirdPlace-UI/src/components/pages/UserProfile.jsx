import React from 'react';
import ProfileInfoCard from '../user/ProfileInfoCard';
import Navbar from '../navigation/Navbar';

export default function UserProfile() {
  return (
    <div>
        <Navbar/>

        <h1>My Profile Page</h1>
        <ProfileInfoCard/>

        <div className='review-card'>
            <h3>Submitted Locations</h3>
            <p>Locations here</p>
        </div>
        <div className='review-card'>
            <h3>Favorite Locations</h3>
            <p>Favorite Locations here</p>
        </div>
        <div className='review-card'>
            <h3>Peggy505's Comments</h3>
            <p>Comments here</p>
        </div>

    </div>
  )
}
