import React, { useEffect, useState } from 'react'
import './ProfileInfoCard.css';
import cherryNoLeaf from '../../assets/cherries-no-leaf.png'
import { useAuth } from '../../context/AuthContext';

export const CherryScoreBadge = ({otherUser}) => {
    const { user } = useAuth();

    const propOtherUser = otherUser;

    const [selectedUser, setSelectedUser] = useState(user.cherryPoints);

    useEffect(() => {
        if (propOtherUser) {
            setSelectedUser(propOtherUser.cherryPoints)
        }
    }, []);

    return (
        <div className='for-padding'>
            {selectedUser > 0 ? ( 
                <div className='cherry-img-and-score'>
                <p className='cherry-score-title'>
                    Cherry Score:
                </p>
                <p className='cherryPoints-and-img'>
                    {user.cherryPoints}
                    <img src={cherryNoLeaf}></img>
                </p>
                </div>
            ) : (
                "No Cherry Points Yet!")
            }
        </div>
    )
}
