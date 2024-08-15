import React from 'react'
import './ProfileInfoCard.css';
import cherryNoLeaf from '../../assets/cherries-no-leaf.png'
import { useAuth } from '../../context/AuthContext';

export const CherryScoreBadge = () => {
    const { user } = useAuth();

    return (
        <div className='for-padding'>
           {user.cherryPoints > 0 ? ( 
            <div className='cherry-img-and-score'>
            <p className='cherry-score-title'>
                Cherry Score:
            </p>
            <p className='cherryPoints-and-img'>
                {user.cherryPoints}
                <img src={cherryNoLeaf}></img>
            </p>
            </div>
            ) : ("No Cherry Points Yet!")}
        </div>
    )
}
